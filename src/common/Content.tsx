import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CameraScreen from "./component/Camera";
import HomeScreen from "../screen/Home";
import ListScreen from "../screen/List";
import ProfileScreen from "../screen/Profile";
import CalendarScreen from "../screen/Calendar";

const Stack = createStackNavigator();

const Content = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default Content;
