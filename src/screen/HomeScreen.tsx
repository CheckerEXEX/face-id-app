import React, { useEffect, useRef } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker, Circle } from 'react-native-maps';
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Icon, Image } from "react-native-elements";
import { Title, Caption} from "react-native-paper";
import * as Location from "expo-location";

// COMPONENT
import Clock from "../common/component/Clock";
import Loading from "../common/component/Loading";

// CSS
import BaseStyle from "../common/styles/base";
import HomeStyle from "../common/styles/home";
import DarkStyles from "../common/styles/MapStyles/Dark.json"

// REDUX
import { useSelector, useDispatch } from "react-redux";


const HomeScreen = (props) => {

  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];

  let { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 0;
  const LONGITUDE = 0;
  const LATITUDE_DELTA = 0.01;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const LATITUDE_SYSTEMEXE = 10.801244131973288;
  const LONGITUDE_SYSTEMEXE = 106.640986249321;
  const RADIUS_DEFAULT = 0.1; //km

  const [errorMsg, setErrorMsg] = useStateIfMounted(null);

  const [location, setLocation] = useStateIfMounted({
    region: {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    },
    company: {
      latitude: LATITUDE_SYSTEMEXE,
      longitude: LONGITUDE_SYSTEMEXE,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }
  });

  const [locationName, setLocationName] = useStateIfMounted(null);
  const [hasRadius, setHasRadius] = useStateIfMounted(true);
  const [isLoading, setIsLoading] = useStateIfMounted(true);
  const [titleLoading, setTitleLoading] = useStateIfMounted(null);
  const [watchID, setWatchID] = useStateIfMounted(null);

  //const [forecast, setForecast] = useStateIfMounted(null);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Không tìm thấy vị trí vui lòng thử lại !");
      }
      let l = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
      let nameLocation = await Location.reverseGeocodeAsync({
        latitude: l.coords.latitude,
        longitude: l.coords.longitude,
      });

      const radius_km = getRadiusTwoPoint(
        LATITUDE_SYSTEMEXE,
        LONGITUDE_SYSTEMEXE,
        l.coords.latitude,
        l.coords.longitude
      );

      if (radius_km <= RADIUS_DEFAULT) {
        setHasRadius(false);
      } else {
        setHasRadius(true);
      }
      setLocationName(nameLocation);
      setLocation({
        region: {
          latitude: l.coords.latitude,
          longitude: l.coords.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        },
        company: {
          latitude: LATITUDE_SYSTEMEXE,
          longitude: LONGITUDE_SYSTEMEXE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
      });
      // setLocation(location);
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
  } else if (location.region.latitude != 0) {
    console.log("LOCATION: " + location.region.latitude);
    locationName.find((item: any) => {
      (streetName = item.name), (city = item.region);
    });
    result = streetName + " - " + city;
    console.log('ADDRESS: ' + result);
  }

  const circleRef = useRef(null)

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
            <View style={StyleSheet.absoluteFillObject}>
              <MapView style={StyleSheet.absoluteFillObject}
                provider={ PROVIDER_GOOGLE }
                // customMapStyle={ DarkStyles }
                showsUserLocation={ true }
                region={ location.region }
                >
                <Marker
                  coordinate={location.company}
                  // image={require('../common/styles/img/pin-company.png')}
                />
                <Circle
                  center={{
                    latitude: location.company.latitude,
                    longitude: location.company.longitude
                  }}
                  ref={circleRef}
                  onLayout={() => (circleRef.current.setNativeProps({
                    strokeColor: "rgba(169,27,45,1)",
                    fillColor: "rgba(169,27,75,0.5)",
                  }))}
                  radius={RADIUS_DEFAULT*1000}
                  strokeWidth={1}
                  strokeColor="rgba(169,27,45,0.8)"
                  fillColor="rgba(169,27,75,0.3)"
                />
              </MapView>
              {/* <View style={{ position: 'absolute', top: 100, left: 50 }}/> */}
            </View>
          </View>
          <View style={{alignItems: "center", paddingTop: 20}}>
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
