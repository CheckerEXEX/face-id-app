"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var Permissions = require("expo-permissions");
var expo_camera_1 = require("expo-camera");
var react_native_elements_1 = require("react-native-elements");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var axios_1 = require("axios");
var constants_1 = require("../../config/constants");
var index_1 = require("../library/react-native-animated-loader/src/index");
var home_1 = require("../styles/home");
var Clock_1 = require("./Clock");
var stack_1 = require("@react-navigation/stack");
var Stack = stack_1.createStackNavigator();
function CameraScreens(props) {
    return (react_1["default"].createElement(Stack.Navigator, { initialRouteName: 'CameraScreen', screenOptions: {
            gestureEnabled: false,
            gestureDirection: "horizontal",
            cardStyleInterpolator: stack_1.CardStyleInterpolators.forHorizontalIOS
        }, headerMode: "none" },
        react_1["default"].createElement(Stack.Screen, { name: "CameraScreen", component: CameraScreen }),
        react_1["default"].createElement(Stack.Screen, { name: "PreviewScreen", component: PreviewScreen }),
        react_1["default"].createElement(Stack.Screen, { name: "ResultScreen", component: ResultScreen })));
}
exports["default"] = CameraScreens;
var CameraScreen = /** @class */ (function (_super) {
    __extends(CameraScreen, _super);
    function CameraScreen(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            captures: [],
            flashMode: expo_camera_1.Camera.Constants.FlashMode.off,
            capturing: null,
            autoFocus: expo_camera_1.Camera.Constants.AutoFocus.on,
            cameraType: expo_camera_1.Camera.Constants.Type.back,
            hasCameraPermission: null,
            toolbar: true,
            dataResponse: [],
            uri: "",
            base64: "",
            rotatedeg: 0
        };
        _this.camera = null;
        _this.setCameraType = function (cameraType) { return _this.setState({ cameraType: cameraType }); };
        _this.handleCaptureIn = function () { return _this.setState({ capturing: true }); };
        // _pickImage = async (props) => {
        //   let image2Data = await ImagePicker.launchImageLibraryAsync({
        //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //   });
        //   if (!image2Data.cancelled) {
        //     props.navigation.navigate('PreviewScreen', { "base64Data": image2Data.base64, "uri": image2Data.uri })
        //   }
        // };
        _this._handleShortCapture = function (props) { return __awaiter(_this, void 0, void 0, function () {
            var photoData, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Take Picture');
                        return [4 /*yield*/, this.camera.takePictureAsync({
                                base64: true
                            })];
                    case 1:
                        photoData = _a.sent();
                        data = { "base64Data": photoData.base64, "uri": photoData.uri };
                        props.navigation.navigate('PreviewScreen', data);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    ;
    CameraScreen.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var camera, audio, hasCameraPermission;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Permissions.askAsync(Permissions.CAMERA)];
                    case 1:
                        camera = _a.sent();
                        return [4 /*yield*/, Permissions.askAsync(Permissions.AUDIO_RECORDING)];
                    case 2:
                        audio = _a.sent();
                        hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
                        this.setState({ hasCameraPermission: hasCameraPermission });
                        return [2 /*return*/];
                }
            });
        });
    };
    ;
    CameraScreen.prototype.render = function () {
        var _this = this;
        var _a = this.state, hasCameraPermission = _a.hasCameraPermission, autoFocus = _a.autoFocus, flashMode = _a.flashMode, cameraType = _a.cameraType, capturing = _a.capturing, captures = _a.captures, toolbar = _a.toolbar;
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(react_native_1.StatusBar, { backgroundColor: "#19224d" }),
            react_1["default"].createElement(react_native_1.View, { style: { flex: 1, backgroundColor: '#19224d' } },
                react_1["default"].createElement(react_native_1.View, { style: { height: 24, backgroundColor: '#19224d' } }),
                react_1["default"].createElement(react_native_1.View, null,
                    react_1["default"].createElement(expo_camera_1.Camera, { type: expo_camera_1.Camera.Constants.Type.front, flashMode: flashMode, autoFocus: autoFocus, style: styles.preview, ref: function (camera) { return _this.camera = camera; } })),
                react_1["default"].createElement(react_native_1.View, { style: styles.buttonArea },
                    react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.container, onPress: function () { return _this._handleShortCapture(_this.props); } },
                        react_1["default"].createElement(react_native_elements_1.Icon, { reverse: true, name: "camera", type: "font-awesome", color: "green" }))))));
    };
    ;
    return CameraScreen;
}(react_1["default"].Component));
var PreviewScreen = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = react_1.useState(false), isSubmiting = _b[0], setIsSubmiting = _b[1];
    var uri = route.params.uri;
    var Submit = function (success) {
        return new Promise(function (resolve, reject) {
            console.log(constants_1.API.PYTHON);
            axios_1["default"].post(constants_1.API.PYTHON + "/predict", {
                image_base64: route.params.base64Data
            }).then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    try {
                        console.log(JSON.stringify(res));
                        //resolve(res);
                    }
                    catch (e) {
                        reject(e);
                    }
                    return [2 /*return*/];
                });
            }); })["catch"](function (err) {
                reject(err);
            });
        });
        // setIsSubmiting(true)
        // setTimeout(() => {
        //   setIsSubmiting(false)
        //   navigation.navigate("ResultScreen", { uri: uri, isSuccess: success, employeeName: "Quang Tùng" })
        // }, 1000)
    };
    return (react_1["default"].createElement(react_native_1.View, { style: [styles.container] },
        isSubmiting && react_1["default"].createElement(index_1["default"], { visible: false, overlayColor: "rgba(255,255,255,1)", source: require("../styles/loader/logo_app.json"), animationStyle: styles.lottie, speed: 1.5, animationType: 'fade', image: false }),
        react_1["default"].createElement(react_native_1.View, { style: { flex: 1, marginTop: 35, alignItems: "center" } },
            react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: {
                    width: winWidth * 0.9,
                    height: winHeight * 0.5,
                    resizeMode: 'contain'
                } }),
            react_1["default"].createElement(react_native_1.View, { style: { marginTop: 20 } },
                react_1["default"].createElement(react_native_1.View, { style: home_1["default"].clock },
                    react_1["default"].createElement(Clock_1["default"], null)),
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: "row", marginTop: 20 } },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(react_native_elements_1.Icon, { name: "map-marker", type: "font-awesome", color: "#227f58", size: 15 })),
                    react_1["default"].createElement(react_native_1.View, { style: { maxWidth: "90%" } },
                        react_1["default"].createElement(react_native_1.Text, { style: [home_1["default"].positionName, { color: "black" }] }, "490/4A - Tha\u0300nh ph\u00F4\u0301 H\u00F4\u0300 Chi\u0301 Minh"))))),
        react_1["default"].createElement(react_native_1.View, { style: styles.buttonArea2 },
            react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('CameraScreen'); } },
                react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Chu\u0323p la\u0323i ")),
            react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return Submit(true); } },
                react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Xa\u0301c nh\u00E2\u0323n (tha\u0300nh c\u00F4ng)")),
            react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return Submit(false); } },
                react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Xa\u0301c nh\u00E2\u0323n (th\u00E2\u0301t ba\u0323i)")))));
};
var ResultScreen = function (_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = route.params, uri = _b.uri, isSuccess = _b.isSuccess, employeeName = _b.employeeName;
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container }, isSuccess ?
        react_1["default"].createElement(react_native_1.View, { style: styles.container },
            react_1["default"].createElement(react_native_1.View, { style: styles.container },
                react_1["default"].createElement(react_native_1.View, null,
                    react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: {
                            width: winWidth * 0.9,
                            height: winHeight * 0.4,
                            resizeMode: 'contain'
                        } }),
                    react_1["default"].createElement(react_native_1.View, { style: {
                            position: 'absolute',
                            top: 10,
                            right: 20
                        } },
                        react_1["default"].createElement(react_native_1.Image, { source: require('../styles/img/checkSucces.png'), style: { width: 80, height: 80, margin: 10 } }))),
                react_1["default"].createElement(react_native_1.View, { style: { marginTop: 20, width: "100%", alignItems: 'center' } },
                    react_1["default"].createElement(react_native_1.View, { style: { borderRadius: 5, borderWidth: 1, backgroundColor: 'gray', padding: 5 } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.txtResultStyle }, "K\u00EA\u0301t qua\u0309")),
                    react_1["default"].createElement(react_native_1.View, { style: { width: 0.7 * winWidth, borderWidth: 1, borderRadius: 20, backgroundColor: "#a4eb96", padding: 10, marginTop: 20 } },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.txtInfoStyle }, "Check in tha\u0300nh c\u00F4ng"),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.txtInfoStyle },
                            "T\u00EAn nh\u00E2n vi\u00EAn: ",
                            employeeName),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.txtInfoStyle }, "Th\u01A1\u0300i gian: 8h00"),
                        react_1["default"].createElement(react_native_1.Text, { style: styles.txtInfoStyle }, "Vi\u0323 tri\u0301: 364 C\u00F4\u0323ng Ho\u0300a")))),
            react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: "space-between", width: "90%", height: 100 } },
                react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('HomeScreen'); } },
                    react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Trang chu\u0309"))))
        :
            react_1["default"].createElement(react_native_1.View, { style: styles.container },
                react_1["default"].createElement(react_native_1.View, { style: styles.container },
                    react_1["default"].createElement(react_native_1.View, null,
                        react_1["default"].createElement(react_native_1.Image, { source: { uri: uri }, style: {
                                width: winWidth * 0.9,
                                height: winHeight * 0.4,
                                resizeMode: 'contain'
                            } }),
                        react_1["default"].createElement(react_native_1.View, { style: {
                                position: 'absolute',
                                top: 10,
                                right: 20
                            } },
                            react_1["default"].createElement(react_native_1.Image, { source: require('../styles/img/checkFail.png'), style: { width: 80, height: 80, margin: 10 } }))),
                    react_1["default"].createElement(react_native_1.View, { style: { marginTop: 20, width: "100%", alignItems: 'center' } },
                        react_1["default"].createElement(react_native_1.View, { style: { borderRadius: 5, borderWidth: 1, backgroundColor: 'gray', padding: 5 } },
                            react_1["default"].createElement(react_native_1.Text, { style: styles.txtResultStyle }, "K\u00EA\u0301t qua\u0309")),
                        react_1["default"].createElement(react_native_1.View, { style: { width: 0.7 * winWidth, borderWidth: 1, borderRadius: 20, backgroundColor: "#fa93a1", padding: 10, marginTop: 20 } },
                            react_1["default"].createElement(react_native_1.Text, { style: [{ color: "white" }, styles.txtInfoStyle] }, "Check in th\u00E2\u0301t ba\u0323i"),
                            react_1["default"].createElement(react_native_1.Text, { style: [{ color: "white" }, styles.txtInfoStyle] }, "Th\u01A1\u0300i gian: 8h00"),
                            react_1["default"].createElement(react_native_1.Text, { style: [{ color: "white" }, styles.txtInfoStyle] }, "Vi\u0323 tri\u0301: 364 C\u00F4\u0323ng Ho\u0300a")))),
                react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', justifyContent: "space-between", width: 0.9 * winWidth, height: 100 } },
                    react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('HomeScreen'); } },
                        react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Trang chu\u0309")),
                    react_1["default"].createElement(react_native_gesture_handler_1.TouchableOpacity, { style: styles.button, onPress: function () { return navigation.navigate('CameraScreen'); } },
                        react_1["default"].createElement(react_native_1.Text, { style: { color: "white" } }, "Chu\u0323p la\u0323i"))))));
};
var _a = react_native_1.Dimensions.get('window'), winWidth = _a.width, winHeight = _a.height;
var styles = react_native_1.StyleSheet.create({
    preview: {
        height: winHeight * 0.75,
        width: winWidth
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
    buttonArea2: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: 0.9 * winWidth,
        height: 100
    }
});
