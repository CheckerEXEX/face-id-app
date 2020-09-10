import React, { useMemo } from 'react';
import {
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSafeArea } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AnimatedTabBar, {
  TabsConfig,
  FlashyTabBarItemConfig,
} from '@gorhom/animated-tabbar';


import AnimatedLoader from "../library/react-native-animated-loader/src/index";

import CameraScreen from "../component/Camera";
import HomeScreen from "../../screen/HomeScreen";
import ListScreen from "../../screen/ListScreen";
import ProfileScreen from "../../screen/ProfileScreen";
import CalendarScreen from "../../screen/CalendarScreen";
import HomeStyle from "../styles/home";


import HomeSVG from '../styles/svg/HomeSVG';
import LikeSVG from '../styles/svg/LikeSVG';
import BellSVG from '../styles/svg/BellSVG';
import SearchSVG from '../styles/svg/SearchSVG';
import ProfileSVG from '../styles/svg/ProfileSVG';

import { MainTabsParams } from './types';

const Tab = createBottomTabNavigator<MainTabsParams>();

const tabs: TabsConfig<FlashyTabBarItemConfig, MainTabsParams> = {
  Home: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: HomeSVG,
      color: '#5B37B7',
    },
    indicator: {
      size: 4,
      color: '#5B37B7',
    },
  },
  Likes: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: LikeSVG,
      color: '#C9379D',
    },
    indicator: {
      size: 4,
      color: '#C9379D',
    },
  },
  Camera: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: BellSVG,
      color: '#ABDD4E',
    },
    indicator: {
      size: 4,
      color: '#ABDD4E',
    },
  },
  Search: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: SearchSVG,
      color: '#E6A919',
    },
    indicator: {
      size: 4,
      color: '#E6A919',
    },
  },
  Profile: {
    labelStyle: {
      color: 'white',
    },
    icon: {
      component: ProfileSVG,
      color: '#1194AA',
    },
    indicator: {
      size: 4,
      color: '#1194AA',
    },
  },
};

const FlashyStyledScreen = () => {
  // hooks
  const { bottom } = useSafeArea();

  // memos
  const screenPaddingBottom = useMemo(() => {
    // icon size + margin padding + outer space + inner space + screen bottom padding
    return 20 + bottom + 12 * 2 + 12 * 2 + 12;
  }, [bottom]);

  const tabBarOptions = useMemo(
    () => ({
      safeAreaInsets: {
        bottom: 0,
      },
      style: {
        height: 60,
        left: 0,
        right: 0,
        bottom: 0,
        marginBottom: bottom,
        backgroundColor: 'gold',

        elevation: 24,
      },
    }),
    [bottom]
  );

  // render
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          return <Icon
          reverse
          reverseColor="#19224d"
          size={28}
          name="home"
          type="font-awesome"
          color="transparent"
        />
          // iconName = focused ? 'ios-information-circle'  : 'ios-information-circle-outline';
        } else if (route.name === 'Likes') {
          return <Icon
            reverse
            reverseColor="#19224d"
            size={28}
            name="list"
            type="font-awesome"
            color="transparent"
          />
        } else if (route.name === 'Camera') {
          return <View style={HomeStyle.circle}><AnimatedLoader
            visible={true}
            overlayColor="#rgba(255,255,255,0)"
            source={require("../styles/loader/28847-face-recognising-system-face-detection-scanning-face-face-scanner.json")}
            animationStyle={HomeStyle.lottie}
            speed={0.5}
            loop={true}
            image={true}
          /></View>
        } else if (route.name === 'Search') {
          return <Icon
            underlayColor="red"
            reverse
            reverseColor="#19224d"
            size={28}
            name="calendar"
            type="font-awesome"
            color="transparent"
          />
        } else if (route.name === 'Profile') {
          return <Icon
            reverse
            reverseColor="#19224d"
            size={28}
            name="file-text"
            type="font-awesome"
            color="transparent"
          />

          iconName = focused ? 'ios-list-box' : 'ios-list';
        }

        // You can return any component that you like here!
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
      tabBarOptions={tabBarOptions}
      // tabBar={props => (
      //   <AnimatedTabBar
      //     preset="flashy"
      //     tabs={tabs}
      //     iconSize={20}
      //     itemOuterSpace={12}
      //     itemInnerSpace={12}
      //     {...props}
      //   />
      // )}

    >
      <Tab.Screen
        name="Home"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Likes',
          paddingBottom: screenPaddingBottom,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Likes"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Search',
          paddingBottom: screenPaddingBottom,
        }}
        component={ProfileScreen}
      />
      <Tab.Screen
        name="Camera"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Search',
        }}
        component={CameraScreen}
      />
      <Tab.Screen
        name="Search"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Profile',
          paddingBottom: screenPaddingBottom,
        }}
        component={ListScreen}
      />
      <Tab.Screen
        name="Profile"
        initialParams={{
          backgroundColor: '#000',
          nextScreen: 'Home',
          paddingBottom: screenPaddingBottom,
        }}
        component={CalendarScreen}
      />
    </Tab.Navigator>
  );
};

export default FlashyStyledScreen;
