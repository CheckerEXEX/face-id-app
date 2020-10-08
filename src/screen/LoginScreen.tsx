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

import LoginStyle from "../common/styles/login";
import BaseStyle from "../common/styles/base";

const LoginScreen = (props) => {

  const [loginId, setLoginId] = useStateIfMounted("quang-tung");
  const [loginPassword, setLoginPassword] = useStateIfMounted("123456");
  const auth = useSelector((state) => state.auth);
  const { errorMessageLogin } = auth;

  const [isLoaded, setIsLoaded] = useStateIfMounted(false);
  const [isLoading, setIsLoading] = useStateIfMounted(false);
  const [titleLoading, setTitleLoading] = useStateIfMounted(null);
  useEffect(() => {
    setTimeout(() => {
      setLoginId('quang-tung');
      setLoginPassword('123456');
      setIsLoaded(true);
    }, 500);
  }, []);

  // gọi useDispatch để sử dụng
  const dispatch = useDispatch();
  console.log(dispatch);

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
                  value={loginId}
                  style={LoginStyle.textInput}
                  placeholderTextColor="gray"
                  placeholder="Tài khoản"
                  onChangeText={(text) => setLoginId(text)}
                />
              </View>
              <View style={LoginStyle.input}>
                <Icon color="#19224d" name="key" size={15} type="font-awesome" style={LoginStyle.icon}/>
                <TextInput
                  value={loginPassword}
                  style={LoginStyle.textInput}
                  secureTextEntry
                  placeholderTextColor="gray"
                  placeholder="Mật khẩu"
                  onChangeText={(text) => setLoginPassword(text)}
                />
              </View>
              <View style={LoginStyle.buttonGroup}>
                <Button
                  containerStyle={{alignItems: 'center'}}
                  loading={auth.loggingIn}
                  buttonStyle={LoginStyle.loginBtn}
                  titleStyle={LoginStyle.loginText}
                  onPress={() => dispatch(login(loginId, loginPassword))}
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
