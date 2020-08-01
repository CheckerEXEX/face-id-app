import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ContentScreen from "./Content";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Content" component={ContentScreen} />
    </Drawer.Navigator>
  );
};

export default Main;
