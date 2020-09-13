import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";
import AnimatedLoader from "../library/react-native-animated-loader/src/index";

import LoadingStyle from "../styles/loading";

const Loading = (props) => {
  return (
    <Modal transparent={true} animationType={"fade"} visible={props.isLoading}>
      <View style={LoadingStyle.modalBackground}>
        <View style={LoadingStyle.activityIndicatorWrapper}>
          <AnimatedLoader
            visible={true}
            overlayColor="rgba(255,255,255,0)"
            source={require("../styles/loader/loading2.json")}
            animationStyle={LoadingStyle.lottie}
            speed={2}
            loop={true}
            animationType={'fade'}
            image={false} />
          {props.titleLoading ? (
            <Text style={LoadingStyle.text}>{props.titleLoading} ...</Text>
          ) : (
            <Text style={LoadingStyle.text}>Đang tải...</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default Loading;
