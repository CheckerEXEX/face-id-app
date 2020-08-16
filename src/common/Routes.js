import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Drawer from './Drawer';

const RootStack = createStackNavigator();

const Routes = () => (
    <SafeAreaProvider>
        <RootStack.Navigator initialRouteName={LoginScreen} screenOptions={{
            headerShown: false,
            gestureEnabled: false,
        }}>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Drawer" component={Drawer} />
        </RootStack.Navigator>
    </SafeAreaProvider>
)

export default Routes;