import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabScreen from './BottomTab'

const Stack = createStackNavigator();

const ContentScreen = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="BottomTab" component={BottomTabScreen} />
        </Stack.Navigator >
    );
}

export default ContentScreen;