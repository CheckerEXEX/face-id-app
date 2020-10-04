import * as React from 'react';
import {
    CardStyleInterpolators,
    HeaderStyleInterpolators,
    TransitionSpecs,
    createStackNavigator } from '@react-navigation/stack';
    import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from '../screen/LoginScreen';
import InitScreen from "../screen/InitScreen";
import CameraScreen from "./component/Camera";
import HomeScreen from "../screen/HomeScreen";
import HistoryScreen from "../screen/HistoryScreen";
import ProfileScreen from "../screen/ProfileScreen";
import CalendarScreen from "../screen/CalendarScreen";
import Drawer from './component/Drawer';

const RootStack = createStackNavigator();

const forFade = ({ current }) => ({
    cardStyle: {
        opacity: current.progress,
    },
});

const Routes = () => (
    <SafeAreaProvider>
        <RootStack.Navigator initialRouteName={LoginScreen}
            screenOptions={{
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: 'vertical',
            cardStyleInterpolator: forFade,
            transitionSpec: {
                open: TransitionSpecs.FadeInFromBottomAndroidSpec,
                close: TransitionSpecs.FadeOutToBottomAndroidSpec,
            },
            headerStyleInterpolator: HeaderStyleInterpolators.forFade,
        }}>
            <RootStack.Screen name="LoginScreen" component={LoginScreen} />
            <RootStack.Screen name="Drawer" component={Drawer} />
            <RootStack.Screen name="InitScreen" component={InitScreen} />
            <RootStack.Screen name="HomeScreen" component={HomeScreen} />
            <RootStack.Screen name="HistoryScreen" component={HistoryScreen} />
            <RootStack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <RootStack.Screen name="CalendarScreen" component={CalendarScreen} />
            <RootStack.Screen name="CameraScreen" component={CameraScreen} />
        </RootStack.Navigator>
    </SafeAreaProvider>
)

export default Routes;