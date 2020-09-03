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
import AnimatedSplash from "react-native-animated-splash-screen";


import { useDispatch } from "react-redux";
import { addUserDto } from "../actions/user";
import LoginStyle from "../common/styles/login"
import BaseStyle from "../common/styles/base"


const LoginScreen = (props) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  // gọi useDispatch để sử dụng
  const dispatch = useDispatch();

  // kiểm tra login
  const handleLogin = () => {
    if (user && password) {
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
      props.navigation.navigate("Drawer");
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
        logoWidht={150}
        logoHeight={150}
        isLoaded={isLoaded}
        backgroundColor={"#FFF"}
        logoImage={require("../../assets/facial-recognition.png")}
      >
      <SafeAreaView style={BaseStyle.topSafeArea} />
      <SafeAreaView style={BaseStyle.bottomSafeArea}>
        <View style={LoginStyle.logoGroup}>
          <Image style={LoginStyle.logoCompany} source={require("../../assets/logo.png")}/>
          <Image style={LoginStyle.logoApp} source={require("../../assets/facial-recognition.png")}/>
          <Text style={LoginStyle.title}>Check-in Face ID</Text>
        </View>
        <View style={LoginStyle.loginGroup}>
          <View style={LoginStyle.input}>
            <Icon color="#19224d" name="user-o" size={15} type="font-awesome" style={LoginStyle.icon}/>
            <TextInput
              style={LoginStyle.textInput}
              placeholderTextColor="gray"
              placeholder="Tài khoản"
              onChangeText={(text) => setUser(text)}
            />
          </View>
          <View style={LoginStyle.input}>
            <Icon color="#19224d" name="key" size={15} type="font-awesome" style={LoginStyle.icon}/>
            <TextInput
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
    </AnimatedSplash>
    </>
  );
};


export default LoginScreen;
