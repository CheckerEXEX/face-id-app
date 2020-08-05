import React, { useState, useEffect, useRef } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "react-native-elements";

const CameraScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [cameraRef, setCameraRef] = useState(null);
  // let cameraRef = useRef();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 0, base64: true };
      const data = await cameraRef.takePictureAsync(options);
      console.log(data);
      const source = data.uri;

      navigation.navigate("CheckIn");
    }
  };

  const handleFacesDetected = (faces) => {
    console.log(faces);
  };

  return (
    <View style={{ flex: 1 }}>
      <Camera
        ref={(ref) => {
          setCameraRef(ref);
        }}
        style={{ flex: 1 }}
        type={Camera.Constants.Type.front}
        onFacesDetected={handleFacesDetected}
        faceDetectorSettings={{
          mode: FaceDetector.Constants.Mode.accurate,
          detectLandmarks: FaceDetector.Constants.Landmarks.none,
          runClassifications: FaceDetector.Constants.Classifications.all,
          minDetectionInterval: 1000,
          tracking: true,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            // disabled={true}
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
