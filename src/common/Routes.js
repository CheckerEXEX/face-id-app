import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screen/Login';
import Main from '../screen/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const RootStack = createStackNavigator();

const Routes = ({ userDtoToken }) => (
    <SafeAreaProvider>
        <RootStack.Navigator screenOptions={{
            headerShown: false
        }} >
            {userDtoToken?.user ?
                (<RootStack.Screen name="Main" component={Main} />)
                :
                (<RootStack.Screen name="Login" component={LoginScreen} />)
            }
        </RootStack.Navigator>
    </SafeAreaProvider>

)

export default Routes;