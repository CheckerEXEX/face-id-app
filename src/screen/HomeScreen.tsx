import React, { useEffect, useState } from "react";
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
  CustomDateStyle,
  DisabledDatesFunc,
  CustomDatesStylesFunc,
  CustomDayHeaderStylesFunc,
} from 'react-native-calendar-picker';
import AnimatedLoader from "../common/library/react-native-animated-loader/src/index";

// COMPONENT
import Clock from "../common/component/Clock";
import Loading from "../common/component/Loading";

// CSS
import BaseStyle from "../common/styles/base";
import HomeStyle from "../common/styles/home";
import GridStyle from "../common/styles/grid";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { removeBase64 } from "../actions/camera";


const HomeScreen = (props) => {

  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];

  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hasRadius, setHasRadius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState(null);
  //const [forecast, setForecast] = useState(null);

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
    console.log("position_system: ", dist);
    return dist;
  };

  let streetName = "";
  let city = "";
  let text = "";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    locationName.find((item: any) => {
      (streetName = item.name), (city = item.region);
    });
    text = streetName + " - " + city;
    console.log(text);
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

  const TestRangeDurations = () => {
    return (
        <CalendarPicker
            minRangeDuration={[
                { date: new Date(), minDuration: 4 },
                { date: new Date(), minDuration: 3 },
            ]}
            maxRangeDuration={[
                { date: new Date(), maxDuration: 4 },
                { date: new Date(), maxDuration: 3 },
            ]}
        />
    );
};

const TestDisabledDates = () => {
    const isDateDisabled: DisabledDatesFunc = date => date.day() % 2 === 1;
    return <CalendarPicker disabledDates={isDateDisabled} />;
};

const TestCustomDateStyle = () => {
    const customStyles: CustomDateStyle[] = [
        {
            date: new Date(),
            containerStyle: { flex: 1 },
            style: { flex: 1 },
            textStyle: { fontSize: 10 },
        },
        {
            date: '2020-10-10',
            style: { flex: 1 },
        },
    ];

    return <CalendarPicker customDatesStyles={customStyles} />;
};

const TestCustomDateFuncs = () => {
    const customDatesStylesFn: CustomDatesStylesFunc = date => {
        if (date.weekday() === 0) {
            return {
                containerStyle: {
                    backgroundColor: 'red',
                },
                textStyle: {
                    color: 'black',
                },
            };
        } else {
            return {
                containerStyle: {
                    backgroundColor: 'white',
                },
                style: {
                    alignContent: 'center',
                },
                textStyle: {
                    color: 'black',
                },
            };
        }
    };

    const customDayHeaderStylesFn: CustomDayHeaderStylesFunc = (date: {
        dayOfWeek: number;
        year: number;
        month: number;
    }) => {
        return {
            textStyle: {
                color: date.year === 2020 ? 'red' : 'blue',
            },
            style: {
                backgroundColor: 'yellow',
            },
        };
    };
    return <CalendarPicker customDatesStyles={customDatesStylesFn} customDayHeaderStyles={customDayHeaderStylesFn} />;
};

const onDateChange: DateChangedCallback = date => console.log(date.day());


const TestRef = () => {
    const ref = React.useRef<CalendarPicker>();
    ref.current!.handleOnPressNext();
    ref.current!.handleOnPressPrevious();
    ref.current!.handleOnPressDay({
        day: 5,
        month: 6,
        year: 2020
    });
    ref.current!.resetSelections();
};

const TestDayOfWeekStyles = () => {
    return (
        <CalendarPicker
            allowRangeSelection
            previousTitle="<"
            previousTitleStyle={{ color: '#fff' }}
            nextTitle=">"
            nextTitleStyle={{ color: '#f00' }}
            dayLabelsWrapper={{
                borderBottomWidth: 0,
                borderTopWidth: 0,
            }}
        />
    );
};


  return (
    <>
      <SafeAreaView style={BaseStyle.topSafeArea} />
      <SafeAreaView style={BaseStyle.bottomSafeArea}>
        {/* <ScrollView> */}
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
              <Icon color="#FFF" size={20} name="sign-out" type="font-awesome" onPress={() => props.navigation.navigate("Login")}/>
              <Text style={{fontSize: 12, color:"#FFF"}}>Đăng xuất</Text>
            </View>
          </View>

          <View style={HomeStyle.body}>

            <View>
              <CalendarPicker
                weekdays={['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'C.Nhật']}
                months={['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12']}
                onDateChange={onDateChange}
                onMonthChange={onDateChange}
                startFromMonday
                showDayStragglers
                allowRangeSelection
                allowBackwardRangeSelect
                previousTitle="Tháng trước"
                nextTitle="Tháng sau"
                selectedDayColor="#4eab52"
                selectedDayStyle={{ flex: 1 }}
                selectedDayTextColor="#FFF"
                selectedRangeStartStyle={{ flex: 1 }}
                selectedRangeEndStyle={{ flex: 1 }}
                selectedRangeStyle={{ flex: 1 }}
                // disabledDates={[new Date(), new Date()]}
                // disabledDatesTextStyle={{ fontSize: 10 }}
                // selectedStartDate={new Date()}
                // selectedEndDate={new Date()}
                minRangeDuration={1}
                maxRangeDuration={2}
                todayBackgroundColor="#f44336"
                // todayTextStyle={{ fontSize: 10 }}
                textStyle={{ color: 'white' }}
                scrollable
                //horizontal={false}
                // scaleFactor={3}
                // minDate={new Date()}
                // maxDate={new Date()}
                //initialDate={new Date()}
                // width={3}
                // height={3}
                enableDateChange
                restrictMonthNavigation
                // dayShape="square"
                // headingLevel={3}
                // previousTitleStyle={{ fontSize: 10 }}
              // nextTitleStyle={{ fontSize: 10 }}
              // dayLabelsWrapper={{ flex: 1 }}
              // monthYearHeaderWrapperStyle={{ flex: 1 }}
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
                  <Text style={HomeStyle.positionName}>{text}</Text>
                </View>
              </View>
              <View style={HomeStyle.clock}>
                <Clock />
              </View>
            </View>
          </View>
          {/* </LinearGradient> */}
          {/*<View style={styles.body}>
            <SafeAreaView>
              <View style={styles.body_top}>
                <View style={styles.body_left}>
                  <TouchableOpacity
                    style={styles.touchable_body_top_left}
                    onPress={() => {
                      props.navigation.navigate("CalendarScreen");
                    }}
                  >
                    <Icon
                      raised
                      size={28}
                      name="calendar-check-o"
                      type="font-awesome"
                      color="red"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.title}>Lịch sử</Text>
                      <Text style={styles.content_title}>Thời gian chấm công</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.body_center}></View>
                <View style={styles.body_right}>
                  <TouchableOpacity
                    style={styles.touchable_body_top_right}
                    onPress={() => {
                      props.navigation.navigate("ProfileScreen");
                    }}
                  >
                    <Icon
                      raised
                      size={28}
                      name="user"
                      type="font-awesome"
                      color="#fa26a0"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.title}>Cá nhân</Text>
                      <Text style={styles.content_title}>Thông tin cá nhân</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.body_bottom}>
                <View style={styles.body_left}>
                  <TouchableOpacity
                    style={styles.touchable_body_bottom_left}
                    onPress={() => {
                      props.navigation.navigate("ListScreen");
                    }}
                  >
                    <Icon
                      raised
                      size={28}
                      name="list-ol"
                      type="font-awesome"
                      color="#6f4a8e"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.title}>Lịch sử</Text>
                      <Text style={styles.content_title}>Thời gian chấm công</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.body_center}></View>
                <View style={styles.body_right}>
                  <TouchableOpacity
                    style={styles.touchable_body_bottom_right}
                    onPress={() => {
                      // props.navigation.openDrawer();
                    }}
                  >
                    <Icon
                      raised
                      size={28}
                      name="file-text"
                      type="font-awesome"
                      color="#05dfd7"
                    />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={styles.title}>Đơn từ</Text>
                      <Text style={styles.content_title}>Đơn xin phép</Text> 
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView> 
          </View>*/}
          {/* <View style={HomeStyle.footer}>
            <View style={GridStyle.boxContainer}>
              <Icon
                reverse
                reverseColor="#19224d"
                size={28}
                name="home"
                type="font-awesome"
                color="transparent"
              />
              <Text style={GridStyle.textIcon}>Trang chính</Text>
            </View>
            <View style={GridStyle.boxContainer}>
              <Icon
                reverse
                reverseColor="#19224d"
                size={28}
                name="list"
                type="font-awesome"
                color="transparent"
              />
              <Text style={GridStyle.textIcon}>Lịch sử</Text>
            </View>
            <View style={GridStyle.boxContainer}>
              <View style={HomeStyle.circle}>
                <TouchableOpacity onPress={() => {props.navigation.navigate("CameraScreen")}}>
                  <AnimatedLoader
                    visible={true}
                    overlayColor="#rgba(255,255,255,0)"
                    source={require("../common/styles/loader/28847-face-recognising-system-face-detection-scanning-face-face-scanner.json")}
                    animationStyle={HomeStyle.lottie}
                    speed={0.5}
                    loop={true}
                    image={true}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={GridStyle.boxContainer}>
              <Icon
                underlayColor="red"
                reverse
                reverseColor="#19224d"
                size={28}
                name="calendar"
                type="font-awesome"
                color="transparent"
              />
            </View>
            <View style={GridStyle.boxContainer}>
              <Icon
                reverse
                reverseColor="#19224d"
                size={28}
                name="file-text"
                type="font-awesome"
                color="transparent"
              />
            </View>
          </View> */}
        {/* </ScrollView> */}
      </SafeAreaView>
    
    </>
  );
};

export default HomeScreen;
