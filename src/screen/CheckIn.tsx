import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Icon } from "react-native-elements";
import * as Location from "expo-location";
import Clock from "../common/Clock";

const CheckInScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const [hasRadius, setHasRadius] = useState(true);

  const LATITUDE_SYSTEMEXE = 37.785834;
  const LONGITUDE_SYSTEMEXE = -122.406417;
  const RADIUS_DEAULT = 0.5;

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

  const openCamera = () => {
    navigation.navigate("CameraScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.title}>CHECK IN</Text>
        </SafeAreaView>
      </View>
      <View style={styles.body}>
        <View>
          {!hasRadius ? (
            <Text style={styles.position}>Vị trí hợp lệ</Text>
          ) : (
            <Text style={{ color: "red", fontWeight: "bold", fontSize: 20 }}>
              Vị trí không hợp lệ
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <View>
            <Icon
              name="map-marker"
              type="font-awesome"
              color="#4eab52"
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
        <View style={{ marginTop: 20 }}>
          <Icon
            // disabled={hasRadius}
            reverse
            name="camera"
            type="font-awesome"
            color="#4eab52"
            size={60}
            onPress={() => openCamera()}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#4eab52",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    width: "100%",
    height: "90%",
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ebecf1",
  },
  position: {
    fontSize: 20,
    color: "#4eab52",
    fontWeight: "bold",
  },
  body_top: {
    width: "100%",
    height: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  body_bottom: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  position_name: {
    marginLeft: 5,
    fontSize: 15,
  },
  clock: {
    marginTop: 20,
  },
});

export default CheckInScreen;
