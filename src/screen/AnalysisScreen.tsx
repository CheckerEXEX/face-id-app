import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { Title, Caption} from "react-native-paper";
import * as Location from "expo-location";
import CalendarPicker, {
  DateChangedCallback,
  CustomDateStyle,
  CustomDatesStylesFunc,
  CustomDayHeaderStylesFunc,
} from 'react-native-calendar-picker';

// COMPONENT
import Loading from "../common/component/Loading";

// CSS
import BaseStyle from "../common/styles/base";
import HomeStyle from "../common/styles/home";
import CalendarStyle from "../common/styles/calendar";

// STORAGE
import { getAuthAsyncStorage } from "../services/getAuthAsyncStorage";

const AnalysisScreen = (props) => {

  // const employeeDto = useSelector((state) => state.employee);
  // const { name, msnv } = employeeDto[0];
  const [employeeData, setEmployeeData] = useStateIfMounted(
    { employeeId : "",
      employeeName : "",
      employeeImage : "",
      email : "",
      phone :"",
      address : "",
      position : "",
      role : ""}
  );
  const [dateSelected, setDateSelected] = useStateIfMounted(null);
  const [isLoading, setIsLoading] = useStateIfMounted(false);
  const [titleLoading, setTitleLoading] = useStateIfMounted(null);

  useEffect(() => {
    (async () => {
      const storage = await getAuthAsyncStorage();
      if (storage.employee && storage.token) {
        setEmployeeData(storage.employee);
      }
      setIsLoading(false);
      setDateSelected("16/10/2020");

    })();
    // component un mount
    return () => {
      setIsLoading(false);
      setTitleLoading(null);
    };
  }, []);

  const TestRangeDurations = (date) => {
    const customStyles: CustomDateStyle[] = [
      {
          date: date,
          containerStyle: { },
          style: { backgroundColor: '#a91b4b' },
          textStyle: { fontWeight: "bold" },
      },
      {
          date: '2020-09-10',
          textStyle: { color: 'red' },
      },
    ];
    return customStyles;
};

// const TestDisabledDates = () => {
//     const isDateDisabled: DisabledDatesFunc = date => date.day() % 2 === 1;
//     return <CalendarPicker disabledDates={isDateDisabled} />;
// };

  const onDateChange: DateChangedCallback = (date) => {
      let dateSelected = date.format('DD/MM/YYYY');
      setDateSelected(dateSelected);
      TestRangeDurations(date);
  }
  // const onMonthChange: MonthChangedCallback = date => console.log('MONTH_SELECTED: ' + date.month());

  const customDayHeaderStyles: CustomDayHeaderStylesFunc = date => {
    switch(date.dayOfWeek) {
      case 5: // Saturday
      return {
        style:CalendarStyle.headerStyle,
        textStyle: CalendarStyle.saturdayHeaderStyle
      };
      case 6: // Sunday
      return {
        style:CalendarStyle.headerStyle,
        textStyle: CalendarStyle.sundayHeaderStyle
      };
      default:
      return {
        style:CalendarStyle.headerStyle,
        textStyle: CalendarStyle.dayHeaderStyle
      };
    }
  };

  const customDatesStyles: CustomDatesStylesFunc = date => {
    switch(date.weekday()) {
      case 5: // Saturday
      return {
        containerStyle: {},
        style:{},
        textStyle: CalendarStyle.saturdayBodyStyle
      };
      case 6: // Sunday
      return {
        containerStyle: {},
        style:{},
        textStyle: CalendarStyle.sundayBodyStyle
      };
      default:
      return {
        containerStyle: {},
        style:{},
        textStyle: CalendarStyle.dayBodyStyle
      };
    }
  };

  return (
    <>
      <SafeAreaView style={BaseStyle.topSafeArea} />
      <SafeAreaView style={BaseStyle.bottomSafeArea}>
        <Loading isLoading={isLoading} />
        <View style={HomeStyle.header}>
          <View style={{justifyContent: "center", flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => { props.navigation.navigate("Drawer")}}>
              <Image style={HomeStyle.avatar} source={require("../common/styles/img/employee.png")}/>
            </TouchableOpacity>
            <View style={{justifyContent: "center"}}>
              <Title style={HomeStyle.avatarTitle}>{employeeData.employeeName}</Title>
              <Caption style={HomeStyle.avatarCaption}>MSNV: {employeeData.employeeId}</Caption>
            </View>
          </View>
          <View style={{justifyContent: "center", paddingRight: 10, top: -5}}>
            <Icon color="#a91b4b" size={20} name="sign-out" type="font-awesome" onPress={() => props.navigation.navigate("LoginScreen")}/>
            <Text style={{fontSize: 12, color:"#a91b4b"}}>Đăng xuất</Text>
          </View>
        </View>

        <View style={HomeStyle.body}>
          <View style={{height: 370, paddingBottom : 10}}>
            <CalendarPicker
              weekdays={['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'C.Nhật']}
              months={['Tháng 1 /', 'Tháng 2 /', 'Tháng 3 /', 'Tháng 4 /', 'Tháng 5 /', 'Tháng 6 /', 'Tháng 7 /', 'Tháng 8 /', 'Tháng 9 /', 'Tháng 10 /', 'Tháng 11 /', 'Tháng 12 /']}
              onDateChange={onDateChange}
              // onMonthChange={onMonthChange}
              showDayStragglers={true}
              nextComponent={<Icon color="#FFF" size={28} name="arrow-circle-right" type="font-awesome"/>}
              previousComponent={<Icon color="#FFF" size={28} name="arrow-circle-left" type="font-awesome"/>}
              selectYearTitle={'Chọn năm'}
              selectMonthTitle={'Năm '}
              // monthYearHeaderWrapperStyle={{borderColor: '#a91b4b', borderWidth: 3, borderRadius: 25, backgroundColor: '#a91b4b', paddingHorizontal: 10, width: 180}}
              customDayHeaderStyles={customDayHeaderStyles}
              customDatesStyles={customDatesStyles}
              selectedDayColor="#388e3c"
              selectedDayTextColor="#FFF"
              textStyle={{ color: '#FFF' }}
              todayBackgroundColor='#a91b4b'
              todayTextStyle={{ fontWeight: 'bold', color: '#FFF' }}
              // scrollable={scrollable}
              minDate={new Date('1900-01-01')}
              maxDate={new Date('2900-12-31')}
              enableDateChange
              restrictMonthNavigation
              headingLevel={5}
            />
            <View
              style={{
                flex: 1,
                marginHorizontal: 10,
                borderBottomColor: '#a91b4b',
                borderBottomWidth: 1,
                width: '95%',
              }}
            />
             <View
              style={{
                paddingTop: 10,
                paddingHorizontal: 10,
              }}
              >
              <Title style={HomeStyle.avatarTitle}>Thông tin check-in ngày: {dateSelected}</Title>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{color:"#fff", marginLeft: 20, width: 130}}>Thời gian check-in</Text>
                <Text style={{color:"#fff", marginLeft: 20}}>:  07:55:12</Text>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{color:"#fff", marginLeft: 20, width: 130}}>Thời gian check-out</Text>
                <Text style={{color:"#fff", marginLeft: 20}}>:  18:00:52</Text>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{color:"#fff", marginLeft: 20, width: 130}}>Đi trễ</Text>
                <Text style={{color:"#fff", marginLeft: 20}}>:  Không</Text>
              </View>
              <View style={{ flexDirection: 'row'}}>
                <Text style={{color:"#fff", marginLeft: 20, width: 130}}>Về sớm</Text>
                <Text style={{color:"#fff", marginLeft: 20}}>:  Không</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default AnalysisScreen;
