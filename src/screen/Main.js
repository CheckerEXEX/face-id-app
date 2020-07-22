import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import ContentScreen from './Content';

const Drawer = createDrawerNavigator();

const Main = () => {
    return (
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Content" component={ContentScreen} />
        </Drawer.Navigator>
    )
}

export default Main;
