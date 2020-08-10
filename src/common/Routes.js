import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Drawer from './Drawer';

const RootStack = createStackNavigator();

const Routes = ({ userDtoToken }) => (
    <SafeAreaProvider>
        <RootStack.Navigator screenOptions={{
            headerShown: false
        }} >
            {userDtoToken?.user ?
                (<RootStack.Screen name="Drawer" component={Drawer} />)
                :
                (<RootStack.Screen name="Login" component={LoginScreen} />)
            }
        </RootStack.Navigator>
    </SafeAreaProvider>

)

export default Routes;