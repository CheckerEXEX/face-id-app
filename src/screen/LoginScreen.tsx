import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addUserDto } from "../actions/user";

const LoginScreen = (props) => {
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
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
    // <ImageBackground
    //   source={require("../../assets/logo.png")}
    //   style={styles.container}
    // >
    <View style={styles.container}>

      <Image style={styles.logoCompany} source={require("../../assets/logo.png")}/>
      <Image style={styles.logoApp} source={require("../../assets/favicon.png")}/>

      <Text style={styles.title}>Check-in Face ID</Text>
      <View style={styles.loginInput}>
        <View style={styles.action}>
          <Icon color="#227f58" name="user-o" size={15} type="font-awesome" style={styles.icon}/>
          <TextInput
            style={styles.textInput}
            placeholderTextColor="gray"
            placeholder="Tài khoản"
            onChangeText={(text) => setUser(text)}
          />
        </View>
        <View style={styles.action}>
          <Icon color="#227f58" name="key" size={15} type="font-awesome" style={styles.icon}/>
          <TextInput
            style={styles.textInput}
            secureTextEntry
            placeholderTextColor="gray"
            placeholder="Mật khẩu"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
      </View>
      <View style={styles.button_container}>
        <TouchableOpacity style={styles.loginBtn} onPress={() => handleLogin()}>
          <Text style={styles.loginText}>Đăng nhập</Text>
          <Icon color="#FFF" name="sign-in" size={20} type="font-awesome" style={styles.iconButton}/>
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
        <Icon reverse name="camera" type="font-awesome" color="#227f58"
          onPress={() => console.log("hello")}
        />
      </View>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: '25%',
    backgroundColor: 'white',
    alignItems: "center",
    height: '100%',
    resizeMode: 'contain'
  },
  logoCompany: {
    width: 300,
    height: 55,
    alignItems: "center",
    justifyContent: "center",
    resizeMode:"stretch"
  },
  logoApp: {
    marginTop: 20,
    width: 150,
    height: 150,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    paddingBottom: 20,
    fontWeight: 'bold',
    color: "black",
    fontSize: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  loginInput: {

  },
  action: {
    flexDirection: "row",
    borderColor: "#227f58",
    borderWidth: 1,
    backgroundColor: "#FFF",
    paddingLeft: 20,
    marginTop: 10,
    width: 300,
  },
  textInput: {
    flex: 1,
    color: "gray",
    height: 45,
    padding: 5,
  },
  button_container: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    marginTop: 13,
    paddingRight: 15,
  },
  iconButton: {
    paddingLeft: 5
  },
  loginBtn: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    backgroundColor: "#227f58",
  },
  loginText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default LoginScreen;
