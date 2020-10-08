import React, { useState } from 'react';
import { View, Text, Image, Dimensions, StyleSheet, Platform, StatusBar } from 'react-native';
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera';
import { Icon } from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';
import AnimatedLoader from "../library/react-native-animated-loader/src/index";

import HomeStyle from "../styles/home";
import Clock from "./Clock";


import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function CameraScreens(props) {
  return (
    <Stack.Navigator
      initialRouteName='CameraScreen'
      screenOptions={{
        gestureEnabled: false,
        gestureDirection: "horizontal",
        cardStyleInterpolator:
          CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="none"
    >
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
      <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
      <Stack.Screen name="ResultScreen" component={ResultScreen} />
    </Stack.Navigator>
  )

}



class CameraScreen extends React.Component {

  constructor(props) {
    super(props)
  };

  state = {
    captures: [],
    flashMode: Camera.Constants.FlashMode.off,
    capturing: null,
    autoFocus: Camera.Constants.AutoFocus.on,
    cameraType: Camera.Constants.Type.back,
    hasCameraPermission: null,
    toolbar: true,
    dataResponse: [],
    uri: "",
    base64: "",
    rotatedeg: 0
  };

  camera = null;

  setFlashMode = (flashMode) => this.setState({ flashMode });

  setCameraType = (cameraType) => this.setState({ cameraType });

  handleCaptureIn = () => this.setState({ capturing: true });

  _pickImage = async (props) => {
    let image2Data = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!image2Data.cancelled) {
      props.navigation.navigate('PreviewScreen', { "base64Data": image2Data.base64, "uri": image2Data.uri })
    }

  };


  _handleShortCapture = async (props) => {
    const photoData = await this.camera.takePictureAsync({
      base64: true
    });
    props.navigation.navigate('PreviewScreen', { "base64Data": photoData.base64, "uri": photoData.uri })
  };


  async componentDidMount() {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');

    this.setState({ hasCameraPermission });
  };

  render() {

    const { hasCameraPermission, autoFocus, flashMode, cameraType, capturing, captures, toolbar } = this.state;
    return (
      <React.Fragment >
        <StatusBar backgroundColor="#19224d" />
        <View style={{ flex: 1, backgroundColor: '#19224d' }}>
          <View style={{ height: 24, backgroundColor: '#19224d' }} />
          <View>
            <Camera
              type={cameraType}
              flashMode={flashMode}
              autoFocus={autoFocus}
              style={styles.preview}
              ref={camera => this.camera = camera}
            />
          </View>
          <View style={styles.buttonArea}>
            <TouchableOpacity
              onPress={() => this.setCameraType(
                cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
              )}>
              <Ionicons name="md-reverse-camera" color="white" size={40} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.container}>
              <Icon reverse name="camera" type="font-awesome" color="green" onPress={() => this._handleShortCapture(this.props)} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this._pickImage(this.props)}>

              <Ionicons name="md-images" size={40} color="white" />
            </TouchableOpacity>

          </View>
        </View>
      </React.Fragment>
    )
  };
}

const PreviewScreen = ({ route, navigation }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);

  let { uri } = route.params;

  let Submit = (success) => {
    setIsSubmiting(true)
    setTimeout(() => {
      setIsSubmiting(false)
      navigation.navigate("ResultScreen", { uri: uri, isSuccess: success, employeeName: "Quang Tùng" })
    }, 1000)
  }


  return (
    <View style={[styles.container]}>
      {isSubmiting && <AnimatedLoader
        visible={false}
        overlayColor="rgba(255,255,255,1)"
        source={require("../styles/loader/logo_app.json")}
        animationStyle={styles.lottie}
        speed={1.5}
        animationType={'fade'}
        image={false}
      />
      }

      <View style={{ flex: 1, marginTop: 35, alignItems: "center" }}>
        <Image source={{ uri: uri }}
          style={{
            width: winWidth * 0.9,
            height: winHeight * 0.5,
            resizeMode: 'contain',
          }} />

        <View style={{ marginTop: 20 }}>
          <View style={HomeStyle.clock}>
            <Clock />
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View>
              <Icon
                name="map-marker"
                type="font-awesome"
                color="#227f58"
                size={15}
              />
            </View>

            <View style={{ maxWidth: "90%" }}>
              <Text style={[HomeStyle.positionName, { color: "black" }]}>490/4A - Thành phố Hồ Chí Minh</Text>
            </View>
          </View>
        </View>
      </View>


      <View style={styles.buttonArea2}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('CameraScreen')}
        >
          <Text style={{ color: "white" }}>Chụp lại </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Submit(true)}
        >
          <Text style={{ color: "white" }}>Xác nhận (thành công)</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => Submit(false)}
        >
          <Text style={{ color: "white" }}>Xác nhận (thất bại)</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}


const ResultScreen = ({ route, navigation }) => {

  let { uri, isSuccess, employeeName } = route.params;

  return (
    <View style={styles.container}>

      {isSuccess ?
        <View style={styles.container}>
          <View style={styles.container}>

            <View>
              <Image source={{ uri: uri }}
                style={{
                  width: winWidth * 0.9,
                  height: winHeight * 0.4,
                  resizeMode: 'contain',
                }} />

              <View style={{
                position: 'absolute',
                top: 10,
                right: 20,
              }}>
                <Image source={require('../styles/img/checkSucces.png')} style={{ width: 80, height: 80, margin: 10 }} />
              </View>
            </View>


            <View style={{ marginTop: 20, width: "100%", alignItems: 'center' }}>
              <View style={{ borderRadius: 5, borderWidth: 1, backgroundColor: 'gray', padding: 5 }}>
                <Text style={styles.txtResultStyle}>Kết quả</Text>
              </View>

              <View style={{ width: 0.7 * winWidth, borderWidth: 1, borderRadius: 20, backgroundColor: "#a4eb96", padding: 10, marginTop: 20 }}>
                <Text style={styles.txtInfoStyle}>Check in thành công</Text>
                <Text style={styles.txtInfoStyle}>Tên nhân viên: {employeeName}</Text>
                <Text style={styles.txtInfoStyle}>Thời gian: 8h00</Text>
                <Text style={styles.txtInfoStyle}>Vị trí: 364 Cộng Hòa</Text>
              </View>
            </View>



          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-between", width: "90%", height: 100 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Text style={{ color: "white" }}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <View style={styles.container}>
          <View style={styles.container}>

            <View>
              <Image source={{ uri: uri }}
                style={{
                  width: winWidth * 0.9,
                  height: winHeight * 0.4,
                  resizeMode: 'contain',
                }} />

              <View style={{
                position: 'absolute',
                top: 10,
                right: 20,
              }}>
                <Image source={require('../styles/img/checkFail.png')} style={{ width: 80, height: 80, margin: 10 }} />
              </View>
            </View>


            <View style={{ marginTop: 20, width: "100%", alignItems: 'center' }}>
              <View style={{ borderRadius: 5, borderWidth: 1, backgroundColor: 'gray', padding: 5 }}>
                <Text style={styles.txtResultStyle}>Kết quả</Text>
              </View>

              <View style={{ width: 0.7 * winWidth, borderWidth: 1, borderRadius: 20, backgroundColor: "#fa93a1", padding: 10, marginTop: 20 }}>
                <Text style={[{ color: "white" }, styles.txtInfoStyle]}>Check in thất bại</Text>
                <Text style={[{ color: "white" }, styles.txtInfoStyle]}>Thời gian: 8h00</Text>
                <Text style={[{ color: "white" }, styles.txtInfoStyle]}>Vị trí: 364 Cộng Hòa</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: "space-between", width: 0.9 * winWidth, height: 100 }}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('HomeScreen')}
            >
              <Text style={{ color: "white" }}>
                Trang chủ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CameraScreen')}
            >
              <Text style={{ color: "white" }}>
                Chụp lại
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>

  )
}
const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight * 0.75,
    width: winWidth,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: "#debf33",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 10
  },
  txtInfoStyle: {
    marginBottom: 10,
    fontSize: 20
  },
  txtResultStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white'
  },
  lottie: {
    width: 200,
    height: 200
  },
  buttonArea: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row"
  },
  buttonArea2:{
    flexDirection: 'row',
    justifyContent: "space-between",
    width: 0.9 * winWidth,
    height: 100
  }

});

