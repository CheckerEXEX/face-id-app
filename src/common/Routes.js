import * as React from 'react';
import {
    CardStyleInterpolators,
    HeaderStyleInterpolators,
    TransitionSpecs,
    createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/LoginScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Drawer" component={Drawer} />
        </RootStack.Navigator>
    </SafeAreaProvider>
)

export default Routes;