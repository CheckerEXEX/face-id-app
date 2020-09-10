import React, { useContext } from "react";
import { View, StyleSheet, Image } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { Title, Caption, Drawer, Paragraph } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const DrawerContent = (props) => {
  const userDto = useSelector((state) => state.user.userDto);
  const { name, msnv } = userDto[0];
  return (
    <DrawerContentScrollView style={styles.drawer}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <Image
            style={{
              resizeMode: "stretch",
              height: 80,
              width: 80,
              borderRadius: 5,
            }}
            source={require("../styles/img/avatar.png")}
          />
          <Title style={styles.title}>{name}</Title>
          <Caption style={styles.caption}>Mã số nhân viên: {msnv}</Caption>
        </View>
        <View style={styles.drawerSection}>
          <DrawerItem
            style={{ justifyContent: "space-between" }}
            icon={() => (
              <MaterialCommunityIcons name="logout-variant" color="#4eab52" />
            )}
            label="Đăng xuất"
            onPress={() => props.navigation.navigate("Login")}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawer: {
    paddingTop: 40,
    backgroundColor: "#FFF",
  },
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 10,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 12,
    lineHeight: 14,
    fontWeight: "bold",
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
