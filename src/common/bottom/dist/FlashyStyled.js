"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var bottom_tabs_1 = require("@react-navigation/bottom-tabs");
var FontAwesome5_1 = require("react-native-vector-icons/FontAwesome5");
var index_1 = require("../library/react-native-animated-loader/src/index");
var Camera_1 = require("../component/Camera");
var HomeScreen_1 = require("../../screen/HomeScreen");
var HistoryScreen_1 = require("../../screen/HistoryScreen");
var ProfileScreen_1 = require("../../screen/ProfileScreen");
var AnalysisScreen_1 = require("../../screen/AnalysisScreen");
var home_1 = require("../styles/home");
var Tab = bottom_tabs_1.createBottomTabNavigator();
var FlashyStyledScreen = function () {
    function MyTabBar(_a) {
        var state = _a.state, descriptors = _a.descriptors, navigation = _a.navigation;
        // Ẩn bottom bar khi ở màn hình Camera
        if (state.index == 2) {
            //console.log(descriptors);
            return null;
        }
        ;
        return (react_1["default"].createElement(react_native_1.View, { style: { flexDirection: 'row', backgroundColor: 'transparent' } }, state.routes.map(function (route, index) {
            var options = descriptors[route.key].options;
            var label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;
            var isFocused = state.index === index;
            var onPress = function () {
                var event = navigation.emit({
                    type: 'tabPress',
                    target: route.key
                });
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name);
                }
            };
            var iconName;
            if (route.name === 'Trang chủ') {
                iconName = 'home';
            }
            else if (route.name === 'Lịch sử') {
                iconName = 'history';
            }
            else if (route.name === 'Chấm công') {
                iconName = null;
            }
            else if (route.name === 'Thông tin') {
                iconName = 'user-tie';
            }
            else if (route.name === 'Thống kê') {
                iconName = 'cog';
            }
            var onLongPress = function () {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key
                });
            };
            return ((null != iconName) ? (react_1["default"].createElement(react_native_1.TouchableOpacity, { accessibilityRole: "button", accessibilityState: { selected: isFocused }, onPress: onPress, key: route.key, onLongPress: onLongPress, style: home_1["default"].tabBarBarStyle },
                react_1["default"].createElement(FontAwesome5_1["default"], { style: isFocused ? home_1["default"].tabFocusIn : home_1["default"].tabFocusOut, size: 28, name: iconName }),
                react_1["default"].createElement(react_native_1.Text, { style: { color: isFocused ? '#a91b4b' : '#19224d', fontSize: 12, paddingBottom: 3 } }, label))) :
                (react_1["default"].createElement(react_native_1.TouchableOpacity, { accessibilityRole: "button", accessibilityState: { selected: isFocused }, onPress: onPress, key: route.key, onLongPress: onLongPress, style: home_1["default"].tabBarBarStyle },
                    react_1["default"].createElement(react_native_1.View, { style: home_1["default"].circle },
                        react_1["default"].createElement(index_1["default"], { visible: true, overlayColor: "#rgba(255,255,255,0)", source: require("../styles/loader/loading1.json"), animationStyle: home_1["default"].lottie, speed: 0.5, loop: true, image: true })),
                    react_1["default"].createElement(react_native_1.Text, { style: { color: isFocused ? '#a91b4b' : '#19224d', fontSize: 12, top: -15 } }, label))));
        })));
    }
    // render
    return (react_1["default"].createElement(Tab.Navigator, { tabBar: function (props) { return react_1["default"].createElement(MyTabBar, __assign({}, props)); } },
        react_1["default"].createElement(Tab.Screen, { name: "Trang ch\u1EE7", component: HomeScreen_1["default"], options: { tabBarBadge: 3 } }),
        react_1["default"].createElement(Tab.Screen, { name: "L\u1ECBch s\u1EED", component: HistoryScreen_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { name: "Ch\u1EA5m c\u00F4ng", component: Camera_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { name: "Th\u1ED1ng k\u00EA", component: AnalysisScreen_1["default"] }),
        react_1["default"].createElement(Tab.Screen, { name: "Th\u00F4ng tin", component: ProfileScreen_1["default"] })));
};
exports["default"] = FlashyStyledScreen;
