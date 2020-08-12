import React, { useState } from "react";
import { SafeAreaView, View, Button, StyleSheet, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Icon } from "react-native-elements";

const HeaderContent = (props) => {
  return (
    <LinearGradient colors={["#4eab52", "cadetblue"]}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: "20%" }}>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <View style={{ marginLeft: 6 }}>
                <Icon
                  name="long-arrow-left"
                  type="font-awesome"
                  size={20}
                  onPress={() => props.navigation.goBack()}
                />
              </View>
            </View>
          </View>
          <View style={{ width: "60%" }}>
            <View
              style={{
                alignItems: "center",
              }}
            >
              <Text style={styles.title}>{props.title}</Text>
            </View>
          </View>
          <View style={{ width: "20%" }}></View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
});

export default HeaderContent;
