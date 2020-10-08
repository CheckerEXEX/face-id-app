import LoginScreen from "../screen/LoginScreen";
import InitScreen from "../screen/InitScreen";
import * as React from "react";
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector} from "react-redux";
import InitScreen from "../screen/InitScreen";
const Stack = createStackNavigator();

export default function Navigation(props) {
  const auth = useSelector((state) => state.auth);
  const token = auth.employee ? auth.employee.token : null;
  return <Stack.Navigator>
    {token === null ? (
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="LoginScreen"
        component={LoginScreen}
      />
    ) : (
      <Stack.Screen
        name="InitScreen"
        component={InitScreen}
      />
    )}
  </Stack.Navigator>;
}
