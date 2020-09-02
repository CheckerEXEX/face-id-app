import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import * as Location from "expo-location";
import Clock from "../common/component/Clock";
import Loading from "../common/component/Loading";
import { useSelector, useDispatch } from "react-redux";
import { removeBase64 } from "../actions/camera";
import { Title, Caption} from "react-native-paper";

const HomeScreen = (props) => {

  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hasRadius, setHasRadius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [titleLoading, setTitleLoading] = useState(null);

  const LATITUDE_SYSTEMEXE = 10.801244131973288;
  const LONGITUDE_SYSTEMEXE = 106.640986249321;
  const RADIUS_DEAULT = 0.5; //km

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
      setIsLoading(false);
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

  // const getWeather = async (latitude, longitude) => {
  //   const api_key = "f0283990e0581e2d7e1b7c41996132e9";
  //   try {
  //     const api_requests = await fetch(
  //       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=vi&
  //       exclude=hourly,daily&appid=${api_key}`
  //     );
  //     const response = await api_requests.json();
  //     console.log("weather is a:", response.current.temp);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} titleLoading={titleLoading} />
      <View style={styles.status}></View>
      <View style={styles.header}>
        {/* <View style={{ width: "20%", justifyContent: "center"}}>
          <Icon size={50} name="navicon" type="font-awesome" onPress={() => props.navigation.openDrawer()}/>
        </View> */}
        {/* <View style={{ width: "60%", justifyContent: "center", alignItems: "center" }}>
          <Image style={styles.logo} source={require("../../assets/favicon.png")}/>
        </View> */}
        <View style={{justifyContent: "center", flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => { props.navigation.navigate("ProfileScreen")}}>
            <Image style={styles.avatar} source={require("../../assets/avatar.png")}/>
          </TouchableOpacity>
          <View style={{justifyContent: "center"}}>
            <Title style={styles.avatarTitle}>{name}</Title>
            <Caption style={styles.avatarCaption}>MSNV: {msnv}</Caption>
          </View>
        </View>
        <View style={{justifyContent: "center", paddingRight: 10}}>
          <Icon color="#FFF" size={30} name="sign-out" type="font-awesome" onPress={() => props.navigation.navigate("Login")}/>
          <Text style={{fontSize: 12, color:"#FFF"}}>Đăng xuất</Text>
        </View>
      </View>
      <View style={styles.location}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "50%",
          }}
        >
          <View>
            {!hasRadius ? (
              <Text style={styles.position}>Vị trí hợp lệ</Text>
            ) : (
              <View>
                <Text style={{ color: "#f44336", fontWeight: "bold", fontSize: 25 }}>
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
              <Text style={styles.position_name}>{text}</Text>
            </View>
          </View>
          <View style={styles.clock}>
            <Clock />
          </View>
        </View>
      </View>
      {/* </LinearGradient> */}
      <View style={styles.body}>
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
      </View>
      <View style={styles.footer}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
          }}
        >
          <View
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
          </View>
          <View
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
          />
           <View style={stylesGrid.boxContainer}><Text>B1</Text></View>
           <View style={stylesGrid.boxContainer}><Text>B2</Text></View>
           <View style={stylesGrid.boxContainer}><Text>B3</Text></View>
           <View style={stylesGrid.boxContainer}><Text>B4</Text></View>
           <View style={stylesGrid.boxContainer}><Text>B5</Text></View>
          <Icon
              name="camera"
              type="font-awesome"
              color="red"
              size={35}
              onPress={() => {
                props.navigation.navigate("CameraScreen");
              }}
            />
        </View>
      </View>
    </View>
  );
};
const stylesGrid = StyleSheet.create({
  boxContainer: {

  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  status: {
    height: getStatusBarHeight(),
    backgroundColor: '#227f58'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#227f58',
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
  },
  location: {
    paddingTop: '25%',
    height: "35%",
  },
  body: {
    width: "100%",
    height: "35%",
    backgroundColor: "#FFF",
  },
  footer: {
    width: "100%",
    height: "20%",
  },
  body_top: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    height: "50%",
  },
  body_bottom: {
    padding: 15,
    flexDirection: "row",
    width: "100%",
    height: "50%",
  },
  body_left: {
    height: "100%",
    width: "48%",
  },
  body_center: {
    height: "100%",
    width: "4%",
  },
  body_right: {
    height: "100%",
    width: "48%",
  },
  touchable_body_top_left: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    // backgroundColor: "#4eab52",
    justifyContent: "center",
    // alignItems: "center",
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: "#4d4646",
    // shadowOpacity: 0.5,
    borderColor: "gray",
    borderWidth: 1,
  },
  touchable_body_top_right: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    // backgroundColor: "#4eab52",
    justifyContent: "center",
    // alignItems: "center",
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: "#4d4646",
    // shadowOpacity: 0.5,
    borderColor: "#4d4646",
    borderWidth: 1,
  },
  touchable_body_bottom_left: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    // backgroundColor: "#4eab52",
    justifyContent: "center",
    // alignItems: "center",
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: "#4d4646",
    // shadowOpacity: 0.5,
    // borderColor: "#4eab52",
    // borderWidth: 1,
    borderColor: "#4d4646",
    borderWidth: 1,
  },
  touchable_body_bottom_right: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    // backgroundColor: "#4eab52",
    justifyContent: "center",
    // alignItems: "center",
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: "#4d4646",
    // shadowOpacity: 0.5,
    borderColor: "#4d4646",
    borderWidth: 1,
  },
  touchable_body_bottom: {
    padding: 5,
    width: "100%",
    borderRadius: 10,
    height: "100%",
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4d4646",
    shadowOpacity: 0.5,
  },
  tilte_touch: {
    fontSize: 18,
    fontWeight: "bold",
  },
  position: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
  position_name: {
    marginLeft: 5,
    fontSize: 15,
  },
  clock: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    color: "#4eab52",
    fontWeight: "700",
  },
  content_title: {
    fontSize: 12,
    color: "#4eab52",
    fontWeight: "700",
  },
  logo:{
    resizeMode: "stretch",
    height: '100%',
    width: 65,
  },
  avatar :{
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    width: 50,
    borderRadius: 100
  },
  avatarTitle: {
    color: '#FFF',
    fontWeight: "bold",
  },
  avatarCaption: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "bold",
    top: -5
  },
  titleHeader: {
    fontSize: 10
  },
});

export default HomeScreen;