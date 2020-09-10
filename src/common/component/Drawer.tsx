import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Content from "./Content";
import DrawerContent from "./DrawerContent";

const StackDrawer = createDrawerNavigator();

const Drawer = () => {
  return (
    <StackDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <StackDrawer.Screen name="Content" component={Content} />
    </StackDrawer.Navigator>
  );
};

export default Drawer;
