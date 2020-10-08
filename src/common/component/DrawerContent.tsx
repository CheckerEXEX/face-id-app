import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import AuthContext from "../AuthContext";
import DrawerStyle from "../styles/drawer";

import { useSelector } from "react-redux";

const DrawerContent = (props) => {

  const paperTheme = useTheme();

  const { signOut, toggleTheme } = React.useContext(AuthContext);

  return (
    <View style={{flex:1}}>
      <DrawerContentScrollView {...props}>
        <View style={DrawerStyle.drawerContent}>
          <View style={DrawerStyle.userInfoSection}>
            <View style={{flexDirection:'row',marginTop: 15}}>
              <Avatar.Image
                source={{
                    uri: 'https://api.adorable.io/avatars/50/abott@adorable.png'
                }}
                size={50}
              />
              <View style={{marginLeft:15, flexDirection:'column'}}>
                <Title style={DrawerStyle.title}>John Doe</Title>
                <Caption style={DrawerStyle.caption}>@j_doe</Caption>
              </View>
            </View>

            <View style={DrawerStyle.row}>
              <View style={DrawerStyle.section}>
                <Paragraph style={[DrawerStyle.paragraph, DrawerStyle.caption]}>80</Paragraph>
                <Caption style={DrawerStyle.caption}>Following</Caption>
              </View>
              <View style={DrawerStyle.section}>
                <Paragraph style={[DrawerStyle.paragraph, DrawerStyle.caption]}>100</Paragraph>
                <Caption style={DrawerStyle.caption}>Followers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={DrawerStyle.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                  <Icon
                  name="home-outline"
                  color={color}
                  size={size}
                  />
              )}
              label="Home"
              onPress={() => {props.navigation.navigate('Home')}}
            />
            <DrawerItem
              icon={({color, size}) => (
                  <Icon
                  name="account-outline"
                  color={color}
                  size={size}
                  />
              )}
              label="Profile"
              onPress={() => {props.navigation.navigate('Profile')}}
            />
            <DrawerItem
              icon={({color, size}) => (
                  <Icon
                  name="bookmark-outline"
                  color={color}
                  size={size}
                  />
              )}
              label="Bookmarks"
              onPress={() => {props.navigation.navigate('BookmarkScreen')}}
            />
            <DrawerItem
              icon={({color, size}) => (
                  <Icon
                  name="settings-outline"
                  color={color}
                  size={size}
                  />
              )}
              label="Settings"
              onPress={() => {props.navigation.navigate('SettingScreen')}}
            />
            <DrawerItem
              icon={({color, size}) => (
                  <Icon
                  name="account-check-outline"
                  color={color}
                  size={size}
                  />
              )}
              label="Support"
              onPress={() => {props.navigation.navigate('SupportScreen')}}
            />
        </Drawer.Section>
        <Drawer.Section title="Preferences">
          <TouchableRipple onPress={() => {toggleTheme()}}>
            <View style={DrawerStyle.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={paperTheme.dark}/>
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
    <Drawer.Section style={DrawerStyle.bottomDrawerSection}>
      <DrawerItem
          icon={({color, size}) => (
              <Icon
              name="exit-to-app"
              color={color}
              size={size}
              />
          )}
          label="Sign Out"
          onPress={() => {signOut()}}
      />
    </Drawer.Section>
  </View>
  );
};

export default DrawerContent;