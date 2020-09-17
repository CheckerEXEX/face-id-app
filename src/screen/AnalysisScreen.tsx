import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  Text,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { Title, Caption} from "react-native-paper";
import * as Location from "expo-location";
import CalendarPicker, {
  DateChangedCallback,
  MonthChangedCallback,
  CustomDateStyle,
  DisabledDatesFunc,
  CustomDatesStylesFunc,
  CustomDayHeaderStylesFunc,
} from 'react-native-calendar-picker';

// COMPONENT
import Clock from "../common/component/Clock";
import Loading from "../common/component/Loading";

// CSS
import BaseStyle from "../common/styles/base";
import HomeStyle from "../common/styles/home";
import CalendarStyle from "../common/styles/calendar";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { removeBase64 } from "../actions/camera";


const HomeScreen = (props) => {

  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];

  const [errorMsg, setErrorMsg] = useStateIfMounted(null);
  const [location, setLocation] = useStateIfMounted(null);
  const [locationName, setLocationName] = useStateIfMounted(null);
  const [hasRadius, setHasRadius] = useStateIfMounted(true);
  const [isLoading, setIsLoading] = useStateIfMounted(true);
  const [titleLoading, setTitleLoading] = useStateIfMounted(null);
  //const [forecast, setForecast] = useStateIfMounted(null);

  const LATITUDE_SYSTEMEXE = 10.801244131973288;
  const LONGITUDE_SYSTEMEXE = 106.640986249321;
  const RADIUS_DEFAULT = 0.1; //km

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Không tìm thấy vị trí vui lòng thử lại !");
      }
      let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
      let nameLocation = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      const radius_km = getRadiusTwoPoint(
        LATITUDE_SYSTEMEXE,
        LONGITUDE_SYSTEMEXE,
        location.coords.latitude,
        location.coords.longitude
      );

      if (radius_km <= RADIUS_DEFAULT) {
        setHasRadius(false);
      } else {
        setHasRadius(true);
      }
      setLocationName(nameLocation)
      setLocation(location);
      setIsLoading(false);
      //getWeather(location.coords.latitude, location.coords.longitude);

    })();
    // component un mount
    return () => {
      setIsLoading(false);
      setErrorMsg(null);
      setLocationName(null);
      setLocation(null);
      setHasRadius(true);
      setIsLoading(false);
      setTitleLoading(null);
    };
  }, []);
  // get base64 from redux
  const base64 = useSelector((state) => state.camera.base64);

  // handle base64
  useEffect(() => {
    if (base64) {
      //console.log("Base 64 is a: ", base64);
      setIsLoading(true);
      setTitleLoading("Đang xử lý");
      try {
        //handle server in here
      } catch (error) {
        console.log(error);
      }

      // remove base64 of redux when success handle
      const action = removeBase64();
      dispatch(action);

      setIsLoading(false);
    }
     // component un mount
    return () => {
      setIsLoading(false);
      setErrorMsg(null);
      setLocationName(null);
      setLocation(null);
      setHasRadius(true);
      setIsLoading(false);
      setTitleLoading(null);
    };
  }, [base64]);

  // calculation location radius two point
  const getRadiusTwoPoint = (
    latitude_1,
    longitude_1,
    latitude_2,
    longitude_2
  ) => {
    const rad_Latitude_1 = (Math.PI * latitude_1) / 180;
    const rad_Latitude_2 = (Math.PI * latitude_2) / 180;
    const theta = longitude_1 - longitude_2;
    const rad_theta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(rad_Latitude_1) * Math.sin(rad_Latitude_2) +
      Math.cos(rad_Latitude_1) * Math.cos(rad_Latitude_2) * Math.cos(rad_theta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  };

  let streetName = "";
  let city = "";
  let result = "";

  if (errorMsg) {
    result = errorMsg;
  } else if (location) {
    locationName.find((item: any) => {
      (streetName = item.name), (city = item.region);
    });
    result = streetName + " - " + city;
    console.log('LOCATION: ' + result);
  }

  // const getWeather = async (latitude, longitude) => {
  //   const api_key = "f0283990e0581e2d7e1b7c41996132e9";
  //   try {
  //     const api_requests = await fetch(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=vi&exclude=hourly,daily&appid=${api_key}`
  //     );
  //     const response = await api_requests.json();
  //     setForecast(response);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 1000);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
      console.log('DATE_SELECTED: ' + date.format('DD/MM/YYYY'));
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

// const TestRef = () => {
//     const ref = React.useRef<CalendarPicker>();
//     ref.current!.handleOnPressNext();
//     ref.current!.handleOnPressPrevious();
//     ref.current!.handleOnPressDay({
//         day: 5,
//         month: 6,
//         year: 2020
//     });
//     ref.current!.resetSelections();
// };

  return (
    <>
      <SafeAreaView style={BaseStyle.topSafeArea} />
      <SafeAreaView style={BaseStyle.bottomSafeArea}>
        <Loading isLoading={isLoading} titleLoading={titleLoading} />
        <View style={HomeStyle.header}>
          {/* <View style={{ width: "20%", justifyContent: "center"}}>
            <Icon size={50} name="navicon" type="font-awesome" onPress={() => props.navigation.openDrawer()}/>
          </View> */}
          {/* <View style={{ width: "60%", justifyContent: "center", alignItems: "center" }}>
            <Image style={HomeStyle.logo} source={require("../common/styles/img/favicon.png")}/>
          </View> */}
          <View style={{justifyContent: "center", flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => { props.navigation.navigate("ProfileScreen")}}>
              <Image style={HomeStyle.avatar} source={require("../common/styles/img/employee.png")}/>
            </TouchableOpacity>
            <View style={{justifyContent: "center"}}>
              <Title style={HomeStyle.avatarTitle}>{name}</Title>
              <Caption style={HomeStyle.avatarCaption}>MSNV: {msnv}</Caption>
            </View>
          </View>
          <View style={{justifyContent: "center", paddingRight: 10, top: -5}}>
            <Icon color="#a91b4b" size={20} name="sign-out" type="font-awesome" onPress={() => props.navigation.navigate("Login")}/>
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
                // style={{
                //   flex: 1,
                //   marginHorizontal: 10,
                //   borderBottomColor: '#a91b4b',
                //   borderBottomWidth: 1,
                //   width: '95%',
                // }}
              />
              </View>
            


          {/* <View style={stylesWeather.current}>
            {isLoaded ? (
              <>
                <Image style={stylesWeather.largeIcon} source={{
                  uri: `http://openweathermap.org/img/wn/${forecast.current.weather[0].icon}@4x.png`,
                }}
                />
                <Text style={stylesWeather.currentTemp}>{Math.round(forecast.current.temp)}°C</Text>
              </>
            ) : null}
          </View> */}
          <View style={{alignItems: "center"}}>
            <View>
              {!hasRadius ? (
                <Text style={HomeStyle.position}>Vị trí hợp lệ</Text>
              ) : (
                <View>
                  <Text style={{ textAlign: "center", color: "#f44336", fontWeight: "bold", fontSize: 25 }}>
                    Vị trí không hợp lệ
                  </Text>
                  <Text style={{ textAlign: "center", color: "#f44336", fontSize: 12 }}>
                    (Bán kính {RADIUS_DEFAULT*1000}m tính từ vị trí công ty)
                  </Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View>
                <Icon
                  name="map-marker"
                  type="font-awesome"
                  color="#227f58"
                  size={15}
                />
              </View>
              <View style={{ maxWidth: "90%" }}>
                <Text style={HomeStyle.positionName}>{result}</Text>
              </View>
            </View>
            <View style={HomeStyle.clock}>
              <Clock />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
