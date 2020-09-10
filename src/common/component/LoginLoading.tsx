import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";
import AnimatedLoader from "../library/react-native-animated-loader/src/index";

const LoginLoading = (props) => {
  return (
    <AnimatedLoader
          visible={props.isLoading}
          overlayColor="rgba(255,255,255,1)"
          source={require("../styles/loader/loading.json")}
          animationStyle={styles.lottie}
          speed={1}
          animationType={'fade'}
          image={false}       />
    // <Modal transparent={false} animationType={"fade"} visible={props.isLoading}>
    //   <View style={styles.modalBackground}>
    //     <View style={styles.activityIndicatorWrapper}>
    //       <ActivityIndicator size="large" color="#4eab52" />
    //       {props.titleLoading ? (
    //         <Text style={styles.text}>{props.titleLoading} ...</Text>
    //       ) : (
    //         <Text style={styles.text}>Đang tải ...</Text>
    //       )}
    //     </View>
    //   </View>
    // </Modal>
  );
};
const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 300
  }
});
// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     alignItems: "center",
//     flexDirection: "column",
//     justifyContent: "space-around",
//   },
//   activityIndicatorWrapper: {
//     backgroundColor: "#FFF",
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-around",
//   },
//   text: {
//     color: "#4eab52",
//     fontWeight: "bold",
//   },
// });

export default LoginLoading;
