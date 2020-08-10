import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContext } from "./src/common/AuthContext";
import Routes from './src/common/Routes';
import { Alert } from 'react-native';
import CameraScreen from './src/common/Camera';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [userDtoToken, setUserDtoToken] = React.useState({});

  const authContext = React.useMemo(() => {
    return {
      signIn: (email, password) => {
        if (email && password) {
          setIsLoading(false);
          setUserDtoToken({
            user: "Khangndit@gmail.com",
            password: "123456?a",
            msnv: "VN166",
            avatar: "base64.png"
          })
        } else {
          setUserDtoToken({})
          Alert.alert(
            'Thông báo',
            'Vui lòng điền Email và Mật khẩu !',
            [
              { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
          );
        }
      },
      signOut: () => {
        setIsLoading(false);
        setUserDtoToken({})
      }
    }
  }, [])

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  })

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Routes userDtoToken={userDtoToken} />
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
export default App;
