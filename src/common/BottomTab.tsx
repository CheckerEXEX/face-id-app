import React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ProfileScreen from "../screen/Profile";
import HomeScreen from "../screen/Home";
import CheckInScreen from "../screen/CheckIn";
import CalendarScreen from "../screen/Calendar";

const Tab = createMaterialBottomTabNavigator();
const BottomTabScreen = () => (
  <Tab.Navigator
    initialRouteName="HomeList"
    activeColor="#FFF"
    shifting={true}
    sceneAnimationEnabled={false}
    barStyle={{ backgroundColor: "#4eab52" }}
  >
    <Tab.Screen
      name="Calendar"
      component={CalendarScreen}
      options={{
        tabBarIcon: "calendar-today",
      }}
    />
    <Tab.Screen
      name="Danh sách"
      component={HomeScreen}
      options={{
        tabBarIcon: "format-list-bulleted",
      }}
    />
    <Tab.Screen
      name="Check In"
      component={CheckInScreen}
      options={{
        tabBarIcon: "camera",
      }}
    />
    {/* <Tab.Screen
      name="Hồ sơ"
      component={ProfileScreen}
      options={{
        tabBarIcon: "account-box-multiple",
      }}
    /> */}
  </Tab.Navigator>
);

export default BottomTabScreen;
