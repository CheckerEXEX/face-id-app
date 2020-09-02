import React from "react";
import { Text, View, Button, StyleSheet, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import HeaderContent from "../common/header/HeaderContent";

const ProfileScreen = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <HeaderContent
          navigation={props.navigation}
          title={"THÔNG TIN CÁ NHÂN"}
        />
      </View>
      <View style={styles.body}></View>
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
    width: "100%",
    height: "10%",
  },
  body: {
    paddingTop: 10,
    padding: 5,
    width: "100%",
    height: "90%",
    backgroundColor: "#f0f0f0",
    // justifyContent: "center",
  },
  footer: {
    width: "100%",
    height: "15%",
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default ProfileScreen;
