import React from "react";
import {
  createStackNavigator,
} from "@react-navigation/stack";
import CameraScreen from "./component/Camera";
import HomeScreen from "../screen/HomeScreen";
import ListScreen from "../screen/ListScreen";
import ProfileScreen from "../screen/ProfileScreen";
import CalendarScreen from "../screen/CalendarScreen";

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const Content = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
      <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default Content;
