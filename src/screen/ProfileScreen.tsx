import React, { useContext } from "react";
import { View, SafeAreaView, Image } from "react-native";
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileStyle from "../common/styles/profile";

import { useSelector } from "react-redux";


const ProfileScreen = (props) => {

  return (
    <SafeAreaView style={ProfileStyle.container}>
      <View style={ProfileStyle.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image style={ProfileStyle.avatar} source={require("../common/styles/img/employee.png")}/>
          <View style={{marginLeft: 20}}>
            <Title style={[ProfileStyle.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{name}</Title>
            <Caption style={ProfileStyle.caption}>{}</Caption>
          </View>
        </View>
      </View>

      <View style={ProfileStyle.userInfoSection}>
        <View style={ProfileStyle.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>Kolkata, India</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>+91-900000009</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>john_doe@email.com</Text>
        </View>
      </View>

      <View style={ProfileStyle.infoBoxWrapper}>
          <View style={[ProfileStyle.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={ProfileStyle.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View>

      <View style={ProfileStyle.menuWrapper}>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="heart-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Your Favorites</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="credit-card" color="#FF6347" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Payment</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="share-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Tell Your Friends</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="account-check-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="settings-outline" color="#FF6347" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Settings</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
