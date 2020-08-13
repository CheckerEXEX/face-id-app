import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import Clock from "../common/component/Clock";

const HomeScreen = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hasRadius, setHasRadius] = useState(true);

  const LATITUDE_SYSTEMEXE = 10.801244131973288;
  const LONGITUDE_SYSTEMEXE = 106.640986249321;
  const RADIUS_DEAULT = 0.2; //km

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

      //get weather from location
      getWeather(location.coords.latitude, location.coords.longitude);
      console.log(hasRadius);
      setLocationName(nameLocation);
      setLocation(location);
    })();
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
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=vi&
        exclude=hourly,daily&appid=${api_key}`
      );
      const response = await api_requests.json();
      console.log("weather is a:", response.current.temp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient style={styles.header} colors={["#4eab52", "cadetblue"]}>
        <View>
          {!hasRadius ? (
            <Text style={styles.position}>Vị trí hợp lệ</Text>
          ) : (
            <Text
              style={{ color: "#e71414", fontWeight: "bold", fontSize: 25 }}
            >
              Vị trí không hợp lệ
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <Icon
              name="map-marker"
              type="font-awesome"
              color="#e71414"
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
      </LinearGradient>
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
                  size={35}
                  name="calendar"
                  type="font-awesome"
                  color="red"
                />
                <Text style={styles.title}>CALENDAR LOG</Text>
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
                  size={35}
                  name="user"
                  type="font-awesome"
                  color="#fa26a0"
                />
                <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
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
                  size={35}
                  name="list-ul"
                  type="font-awesome"
                  color="#05dfd7"
                />
                <Text style={styles.title}>DANH SÁCH LOG</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.body_center}></View>
            <View style={styles.body_right}>
              <TouchableOpacity
                style={styles.touchable_body_bottom_right}
                onPress={() => {
                  props.navigation.navigate("ProfileScreen");
                }}
              >
                <Icon
                  raised
                  size={35}
                  name="user"
                  type="font-awesome"
                  color="#fa26a0"
                />
                <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
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
            backgroundColor: "#FFF",
          }}
        >
          <View
            style={{
              position: "absolute",
              alignSelf: "center",
              backgroundColor: "#FFF",
              borderRadius: 50,
              bottom: 25,
              zIndex: 10,
            }}
          >
            <Icon
              name="camera"
              // disabled={hasRadius}
              type="font-awesome"
              color="#4eab52"
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
              backgroundColor: "#EEEEEE",
              borderColor: "#eeeeee",
              borderWidth: 1,
              bottom: 0,
              zIndex: 1,
              width: "100%",
              height: 75,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          />
          {/* <LinearGradient
            style={{
              position: "absolute",
              backgroundColor: "gray",
              bottom: 0,
              zIndex: 1,
              width: "100%",
              height: 75,
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
            colors={["#4eab52", "cadetblue"]}
          ></LinearGradient> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background_img: {
    width: "100%",
    height: "90%",
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "45%",
  },
  body: {
    width: "100%",
    height: "40%",
    backgroundColor: "#FFF",
  },
  footer: {
    width: "100%",
    height: "15%",
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
    backgroundColor: "#4eab52",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4d4646",
    shadowOpacity: 0.5,
  },
  touchable_body_top_right: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    backgroundColor: "#4eab52",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4d4646",
    shadowOpacity: 0.5,
  },
  touchable_body_bottom_left: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    backgroundColor: "#005086",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4d4646",
    shadowOpacity: 0.5,
  },
  touchable_body_bottom_right: {
    padding: 5,
    width: "100%",
    borderRadius: 5,
    height: "100%",
    backgroundColor: "#005086",
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "#4d4646",
    shadowOpacity: 0.5,
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
    color: "#4eab52",
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
    color: "#ebecf1",
    fontWeight: "700",
  },
});

export default HomeScreen;
