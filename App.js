import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "./src/common/AuthContext";
import Routes from './src/common/Routes';
import { Alert } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
export default App;
