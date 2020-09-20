import React, { useEffect } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { Icon, Input, Button, Text } from "react-native-elements";

import LoginLoading from "../common/component/LoginLoading";
import AnimatedSplash from "react-native-animated-splash-screen";
import AnimatedLoader from "../common/library/react-native-animated-loader/src/index";

import { useDispatch, useSelector } from "react-redux";
import {login} from "../actions/auth";

import { addUserDto } from "../actions/user";

import LoginStyle from "../common/styles/login";
import BaseStyle from "../common/styles/base";

const LoginScreen = (props) => {

  const [username, setUsername] = useStateIfMounted("quang-tung");
  const [password, setPassword] = useStateIfMounted("123456");
  const auth = useSelector((state) => state.auth);
  const { errorMessageLogin } = auth;

  const [isLoaded, setIsLoaded] = useStateIfMounted(false);
  const [isLoading, setIsLoading] = useStateIfMounted(false);
  const [titleLoading, setTitleLoading] = useStateIfMounted(null);
  useEffect(() => {
    setTimeout(() => {
      setUsername('quang-tung');
      setPassword('123456');
      setIsLoaded(true);
    }, 500);
  }, []);

  // gọi useDispatch để sử dụng
  const dispatch = useDispatch();

  // // kiểm tra login
  // const handleLogin = () => {
  //   if (username && password) {
  //     setIsLoading(true);
  //     setTitleLoading("Đang xử lý");
  //     // xử lý server ở đây

  //     // server trả về user dto
  //     const userDto = {
  //       user: "quang-tung@system-exe.com.vn",
  //       password: "########",
  //       name: "Nguyễn Quang Tùng",
  //       msnv: "SEV087",
  //     };
  //     // gọi qua action
  //     const action = addUserDto(userDto);
  //     dispatch(action);
  //     setTimeout(() => {
  //       setIsLoading(false);
  //       props.navigation.navigate("InitScreen");
  //     }, 2000);
  //   } else {
  //     Alert.alert(
  //       "Thông báo",
  //       "Vui lòng nhập thông tin đăng nhập!",
  //       [{ text: "OK", onPress: () => console.log("OK Pressed") }],
  //       { cancelable: false }
  //     );
  //   }
  // };

  return (
    <>
      <AnimatedSplash
        isLoaded={isLoaded}
        backgroundColor={"#FFF"}
        translucent={true}
        preload={true}
        logoImage={require("../common/styles/img/Annotation.png")}
      >
        <>
          <LoginLoading isLoading={isLoading} titleLoading={titleLoading} />
          <SafeAreaView style={BaseStyle.topSafeArea} />
          <SafeAreaView style={BaseStyle.bottomSafeArea}>
            <View style={LoginStyle.logoGroup}>
              <Image style={LoginStyle.logoCompany} source={require("../common/styles/img/logo.png")}/>
              <AnimatedLoader
                visible={isLoaded}
                overlayColor="#rgba(255,255,255,0)"
                source={require("../common/styles/loader/logo_app.json")}
                animationStyle={LoginStyle.lottie}
                speed={1.5}
                loop={false}
                image={true}
              />
              {/* <Image style={LoginStyle.logoApp} source={require("../common/styles/loader/17882-face-recognition.json")}/> */}
              <Text style={LoginStyle.title}>Check-in Face ID</Text>
            </View>
            <View style={LoginStyle.loginGroup}>
              <View style={LoginStyle.input}>
                <Icon color="#19224d" name="user-o" size={15} type="font-awesome" style={LoginStyle.icon}/>
                <TextInput
                  value={username}
                  style={LoginStyle.textInput}
                  placeholderTextColor="gray"
                  placeholder="Tài khoản"
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View style={LoginStyle.input}>
                <Icon color="#19224d" name="key" size={15} type="font-awesome" style={LoginStyle.icon}/>
                <TextInput
                  value={password}
                  style={LoginStyle.textInput}
                  secureTextEntry
                  placeholderTextColor="gray"
                  placeholder="Mật khẩu"
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View style={LoginStyle.buttonGroup}>
                <Button
                  containerStyle={{alignItems: 'center'}}
                  loading={auth.loggingIn}
                  buttonStyle={LoginStyle.loginBtn}
                  titleStyle={LoginStyle.loginText}
                  onPress={() => dispatch(login(username, password))}
                  title="Đăng nhập"
                  iconRight={true}
                  icon={
                    <Icon color="#FFF" name="sign-in" size={20} type="font-awesome" style={LoginStyle.iconButton}/>
                  }
                >
                </Button>

                <Text
                  style={{
                    color: "gray",
                    fontSize: 12,
                    paddingBottom: 5,
                  }}
                >
                  hoặc đăng nhập với Face ID
                </Text>
                <Icon reverse name="camera" type="font-awesome" color="#19224d" onPress={() => console.log("hello")}
                />
              
                {/* { errorMessageLogin && <View style={{alignItems: 'center'}}>
                    <Text style={styles.errorMessage}>{errorMessageLogin}</Text>
                  </View> } */}
              </View>
            </View>
          </SafeAreaView>
        </>
      </AnimatedSplash>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#DCDCDC',
  },
  submitButton: {
    width: '96%',
  },
  errorMessage: {
    color: '#ff0000'
  }
});


export default LoginScreen;
