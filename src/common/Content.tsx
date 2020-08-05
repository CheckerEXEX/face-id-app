import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabScreen from "./BottomTab";
import CameraScreen from "./Camera";

const Stack = createStackNavigator();

const ContentScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BottomTab" component={BottomTabScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
};

export default ContentScreen;
