import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { addBase64 } from "../../actions/camera";

const CameraScreen = (props) => {
  const [cameraRef, setCameraRef] = useState(null);
  const [base64, setBase64] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
    })();
    // component un mount
    return () => {
      console.log("un mount");
    };
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      const base64 = data.base64;
      // add data => base 64 in redux
      const action = addBase64(base64);
      dispatch(action);
      props.navigation.navigate("HomeScreen");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => {
          setCameraRef(ref);
        }}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={async () => {
              if (cameraRef) {
                takePicture();
              }
            }}
          >
            <View style={styles.camera_icon_1}>
              <Icon
                name="camera"
                type="font-awesome"
                color="#4eab52"
                size={25}
              ></Icon>
            </View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  camera_icon_1: {
    borderWidth: 2,
    borderRadius: 200,
    borderColor: "white",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  camera_icon_2: {
    borderWidth: 2,
    borderRadius: 200,
    borderColor: "white",
    height: 40,
    width: 40,
    backgroundColor: "#4eab52",
  },
});

export default CameraScreen;
