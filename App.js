import React, {useState, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';

// import { AuthContext } from "./components/context";
import { Provider } from 'react-redux';
import store from './src/reducers';
import { navigationRef } from './src/services/navRef';
import {getAuthAsyncStorage} from "./src/services/getAuthAsyncStorage";
import {loggedIn} from "./src/actions/auth";


import Routes from './src/common/Routes';

const App = () => {

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }
  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const [isLoading, setIsLoadingFromAsyncStorage] = useState(true);
  useEffect(() => {
    const load = async () => {
      await setIsLoadingFromAsyncStorage(true);
      const userStorage = await getAuthAsyncStorage();
      if (userStorage.user && userStorage.token) {
        await store.dispatch(loggedIn({
          user: userStorage.user,
          token: userStorage.token,
        }));
      }
      await setIsLoadingFromAsyncStorage(false);
    }
    load();
  }, []);

  if (isLoading) {
    return null;
  }

  return (

    <PaperProvider theme={theme}>
      {/* <AuthContext.Provider value={authContext}> */}
        <Provider theme={theme} store={store}>
          <NavigationContainer ref={navigationRef} theme={theme}>
            <Routes />
          </NavigationContainer>
        </Provider>
      {/* </AuthContext.Provider> */}
    </PaperProvider>
  );
}
export default App;
