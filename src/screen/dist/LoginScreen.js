"use strict";
exports.__esModule = true;
var react_1 = require("react");
var use_state_if_mounted_1 = require("use-state-if-mounted");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var LoginLoading_1 = require("../common/component/LoginLoading");
var react_native_animated_splash_screen_1 = require("react-native-animated-splash-screen");
var index_1 = require("../common/library/react-native-animated-loader/src/index");
var react_redux_1 = require("react-redux");
var auth_1 = require("../actions/auth");
var login_1 = require("../common/styles/login");
var base_1 = require("../common/styles/base");
var LoginScreen = function (props) {
    var _a = use_state_if_mounted_1.useStateIfMounted("quang-tung"), loginId = _a[0], setLoginId = _a[1];
    var _b = use_state_if_mounted_1.useStateIfMounted("123456"), loginPassword = _b[0], setLoginPassword = _b[1];
    var auth = react_redux_1.useSelector(function (state) { return state.auth; });
    var errorMessageLogin = auth.errorMessageLogin;
    var _c = use_state_if_mounted_1.useStateIfMounted(false), isLoaded = _c[0], setIsLoaded = _c[1];
    var _d = use_state_if_mounted_1.useStateIfMounted(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = use_state_if_mounted_1.useStateIfMounted(null), titleLoading = _e[0], setTitleLoading = _e[1];
    react_1.useEffect(function () {
        setTimeout(function () {
            setLoginId('quang-tung');
            setLoginPassword('123456');
            setIsLoaded(true);
        }, 500);
    }, []);
    // gọi useDispatch để sử dụng
    var dispatch = react_redux_1.useDispatch();
    //console.log(dispatch);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(react_native_animated_splash_screen_1["default"], { isLoaded: isLoaded, backgroundColor: "#FFF", translucent: true, preload: true, logoImage: require("../common/styles/img/Annotation.png") },
            react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(LoginLoading_1["default"], { isLoading: isLoading, titleLoading: titleLoading }),
                react_1["default"].createElement(react_native_1.SafeAreaView, { style: base_1["default"].topSafeArea }),
                react_1["default"].createElement(react_native_1.SafeAreaView, { style: base_1["default"].bottomSafeArea },
                    react_1["default"].createElement(react_native_1.View, { style: login_1["default"].logoGroup },
                        react_1["default"].createElement(react_native_1.Image, { style: login_1["default"].logoCompany, source: require("../common/styles/img/logo.png") }),
                        react_1["default"].createElement(index_1["default"], { visible: isLoaded, overlayColor: "#rgba(255,255,255,0)", source: require("../common/styles/loader/logo_app.json"), animationStyle: login_1["default"].lottie, speed: 1.5, loop: false, image: true }),
                        react_1["default"].createElement(react_native_elements_1.Text, { style: login_1["default"].title }, "Check-in Face ID")),
                    react_1["default"].createElement(react_native_1.View, { style: login_1["default"].loginGroup },
                        react_1["default"].createElement(react_native_1.View, { style: login_1["default"].input },
                            react_1["default"].createElement(react_native_elements_1.Icon, { color: "#19224d", name: "user-o", size: 15, type: "font-awesome", style: login_1["default"].icon }),
                            react_1["default"].createElement(react_native_1.TextInput, { value: loginId, style: login_1["default"].textInput, placeholderTextColor: "gray", placeholder: "T\u00E0i kho\u1EA3n", onChangeText: function (text) { return setLoginId(text); } })),
                        react_1["default"].createElement(react_native_1.View, { style: login_1["default"].input },
                            react_1["default"].createElement(react_native_elements_1.Icon, { color: "#19224d", name: "key", size: 15, type: "font-awesome", style: login_1["default"].icon }),
                            react_1["default"].createElement(react_native_1.TextInput, { value: loginPassword, style: login_1["default"].textInput, secureTextEntry: true, placeholderTextColor: "gray", placeholder: "M\u1EADt kh\u1EA9u", onChangeText: function (text) { return setLoginPassword(text); } })),
                        react_1["default"].createElement(react_native_1.View, { style: login_1["default"].buttonGroup },
                            react_1["default"].createElement(react_native_elements_1.Button, { containerStyle: { alignItems: 'center' }, loading: auth.loggingIn, buttonStyle: login_1["default"].loginBtn, titleStyle: login_1["default"].loginText, onPress: function () { return dispatch(auth_1.login(loginId, loginPassword)); }, title: "\u0110\u0103ng nh\u1EADp", iconRight: true, icon: react_1["default"].createElement(react_native_elements_1.Icon, { color: "#FFF", name: "sign-in", size: 20, type: "font-awesome", style: login_1["default"].iconButton }) }),
                            react_1["default"].createElement(react_native_elements_1.Text, { style: {
                                    color: "gray",
                                    fontSize: 12,
                                    paddingBottom: 5
                                } }, "ho\u1EB7c \u0111\u0103ng nh\u1EADp v\u1EDBi Face ID"),
                            react_1["default"].createElement(react_native_elements_1.Icon, { reverse: true, name: "camera", type: "font-awesome", color: "#19224d", onPress: function () { return console.log("hello"); } }))))))));
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#DCDCDC'
    },
    submitButton: {
        width: '96%'
    },
    errorMessage: {
        color: '#ff0000'
    }
});
exports["default"] = LoginScreen;
