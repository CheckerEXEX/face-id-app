import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  SafeAreaView
} from "react-native";
import { Icon } from "react-native-elements";
import LoginLoading from "../common/component/LoginLoading";
import AnimatedSplash from "react-native-animated-splash-screen";
import AnimatedLoader from "react-native-animated-loader";
import { useDispatch } from "react-redux";
import { addUserDto } from "../actions/user";

import LoginStyle from "../common/styles/login"
import BaseStyle from "../common/styles/base"


const LoginScreen = (props) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [titleLoading, setTitleLoading] = useState(null);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 500);
  }, []);

  // gọi useDispatch để sử dụng
  const dispatch = useDispatch();

  // kiểm tra login
  const handleLogin = () => {
    if (user && password) {
      setIsLoading(true);
      setTitleLoading("Đang xử lý");
      // xử lý server ở đây

      // server trả về user dto
      const userDto = {
        user: "khangndit@gmail.com",
        password: "########",
        name: "Nguyễn Duy Khang",
        msnv: "SEV168",
      };
      // gọi qua action
      const action = addUserDto(userDto);
      dispatch(action);
      setTimeout(() => {
        setIsLoading(false);
        props.navigation.navigate("Drawer");
      }, 5000);
    } else {
      Alert.alert(
        "Thông báo",
        "Vui lòng nhập thông tin đăng nhập!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

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
                <TextInput defaultValue="nqtung"
                  style={LoginStyle.textInput}
                  placeholderTextColor="gray"
                  placeholder="Tài khoản"
                  onChangeText={(text) => setUser(text)}
                />
              </View>
              <View style={LoginStyle.input}>
                <Icon color="#19224d" name="key" size={15} type="font-awesome" style={LoginStyle.icon}/>
                <TextInput defaultValue="123456"
                  style={LoginStyle.textInput}
                  secureTextEntry
                  placeholderTextColor="gray"
                  placeholder="Mật khẩu"
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View style={LoginStyle.buttonGroup}>
                <TouchableOpacity style={LoginStyle.loginBtn} onPress={() => handleLogin()}>
                  <Text style={LoginStyle.loginText}>Đăng nhập</Text>
                  <Icon color="#FFF" name="sign-in" size={20} type="font-awesome" style={LoginStyle.iconButton}/>
                </TouchableOpacity>
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
              </View>
            </View>
          </SafeAreaView>
        </>
      </AnimatedSplash>
    </>
  );
};


export default LoginScreen;
