import React from "react";
import { Text, View, Button, StyleSheet, SafeAreaView } from "react-native";

const ProfileScreen = ({ navigation: { goBack } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
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
                <Button
                  onPress={() => goBack()}
                  title="Quay lại"
                  color="black"
                />
              </View>
            </View>
            <View style={{ width: "60%" }}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>THÔNG TIN CÁ NHÂN</Text>
              </View>
            </View>
            <View style={{ width: "20%" }}></View>
          </View>
        </SafeAreaView>
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
    backgroundColor: "#4eab52",
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
