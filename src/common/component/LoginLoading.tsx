import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";
import AnimatedLoader from "../library/react-native-animated-loader/src/index";

const LoginLoading = (props) => {
  return (
    <AnimatedLoader
      visible={props.isLoading}
      overlayColor="rgba(255,255,255,1)"
      source={require("../styles/loader/logo_app.json")}
      animationStyle={styles.lottie}
      speed={1.5}
      animationType={'fade'}
      image={false}
    />
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200
  }
});


export default LoginLoading;
