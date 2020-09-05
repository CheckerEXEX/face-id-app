import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import { Icon, Image } from "react-native-elements";
import * as Location from "expo-location";
import Clock from "../common/component/Clock";
import Loading from "../common/component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { removeBase64 } from "../actions/camera";
import { Title, Caption} from "react-native-paper";

import BaseStyle from "../common/styles/base";
import HomeStyle from "../common/styles/home";
import GridStyle from "../common/styles/grid";

const HomeScreen = (props) => {

  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hasRadius, setHasRadius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState(null);
  const [forecast, setForecast] = useState(null);

  const LATITUDE_SYSTEMEXE = 10.801244131973288;
  const LONGITUDE_SYSTEMEXE = 106.640986249321;
  const RADIUS_DEAULT = 0.1; //km

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Không tìm thấy vị trí vui lòng thử lại !");
      }
      let location = await Location.getCurrentPositionAsync({});
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
      if (radius_km <= RADIUS_DEAULT) {
        setHasRadius(false);
      } else {
        setHasRadius(true);
      }
      setLocationName(nameLocation);
      setLocation(location);

      getWeather(location.coords.latitude, location.coords.longitude);

    })();
    // component un mount
    return () => {
      setIsLoading(false);
      setLocationName(null);
      setLocation(null);
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
    console.log("positon_system: ", dist);
    return dist;
  };

  let street = "";
  let city = "";
  let text = "";

  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    locationName.find((item: any) => {
      (street = item.street), (city = item.region);
    });
    text = street + " - " + city;
  }

  const getWeather = async (latitude, longitude) => {
    const api_key = "f0283990e0581e2d7e1b7c41996132e9";
    try {
      const api_requests = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&lang=vi&exclude=hourly,daily&appid=${api_key}`
      );
      const response = await api_requests.json();
      setForecast(response);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
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
            <View style={{justifyContent: "center", paddingRight: 10}}>
              <Icon color="#FFF" size={30} name="sign-out" type="font-awesome" onPress={() => props.navigation.navigate("Login")}/>
              <Text style={{fontSize: 12, color:"#FFF"}}>Đăng xuất</Text>
            </View>
          </View>

          <View style={HomeStyle.body}>
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
                      (Bán kính {RADIUS_DEAULT*1000}m tính từ vị trí công ty)
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
          <View style={HomeStyle.footer}>
              {/* <View
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  backgroundColor: "#FFF",
                  borderRadius: 50,
                  bottom: 55,
                  zIndex: 10,
                }}
              >
                <Icon
                  name="camera"
                  // disabled={hasRadius}
                  type="font-awesome"
                  color="#227f58"
                  containerStyle={{ alignSelf: "center" }}
                  reverse
                  size={35}
                  onPress={() => {
                    props.navigation.navigate("CameraScreen");
                  }}
                />
              </View> */}
              {/* <View
                style={{
                  position: "absolute",
                  backgroundColor: "#227f58",
                  borderColor: "#227f58",
                  borderTopWidth: 0.5,
                  bottom: 0,
                  zIndex: 1,
                  width: "100%",
                  height: 100,
                  paddingHorizontal: 15,
                  paddingVertical: 10,

                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              /> */}
              <View style={GridStyle.boxContainer}><Text>B1</Text></View>
              <View style={GridStyle.boxContainer}><Text>B2</Text></View>
              <View style={GridStyle.boxContainer}><Text>B3</Text></View>
              <View style={GridStyle.boxContainer}><Text>B4</Text></View>
              <View style={GridStyle.boxContainer}><Text>B5</Text></View>
          </View>
        {/* </ScrollView> */}
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;
