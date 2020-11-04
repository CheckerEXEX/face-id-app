import React, { useEffect } from "react";
import { View, SafeAreaView, Image } from "react-native";
import { useStateIfMounted } from "use-state-if-mounted";
import {
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileStyle from "../common/styles/profile";

import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";

import {getAuthAsyncStorage} from "../../src/services/getAuthAsyncStorage";

const ProfileScreen = (props) => {

  const [employeeData, setEmployeeData] = useStateIfMounted(
    { employeeId : "",
      employeeName : "",
      employeeImage : "",
      email : "",
      phone :"",
      address : "",
      position : "",
      role : ""}
  );
  const [isLoading, setIsLoadingFromAsyncStorage] = useStateIfMounted(true);

  useEffect(() => {
    (async () => {
      setIsLoadingFromAsyncStorage(true);
      const storage = await getAuthAsyncStorage();
      if (storage.employee && storage.token) {
        setEmployeeData(storage.employee);
      }
      setIsLoadingFromAsyncStorage(false);
    })();
    // component un mount
    return () => {
      setEmployeeData({ employeeId : "",
      employeeName : "",
      employeeImage : "",
      email : "",
      phone :"",
      address : "",
      position : "",
      role : ""})
    };
    setIsLoadingFromAsyncStorage(false)
  }, []);

  if (isLoading) {
    return null;
  }

  const dispatch = useDispatch();

  return (
    <SafeAreaView style={ProfileStyle.container}>
      <View style={ProfileStyle.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Image style={ProfileStyle.avatar} source={require("../common/styles/img/employee.png")}/>
          <View style={{marginLeft: 20}}>
            <Title style={[ProfileStyle.title, {
              marginTop:15,
              marginBottom: 5,
            }]}>{employeeData.employeeName}</Title>
            <Caption style={ProfileStyle.caption}>{}</Caption>
          </View>
        </View>
      </View>

      <View style={ProfileStyle.userInfoSection}>
        <View style={ProfileStyle.row}>
          <Icon name="id-card" color="#19224d" size={20}/>
          <Text style={{color:"#19224d", marginLeft: 20}}>{employeeData.employeeId}</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="license" color="#19224d" size={20}/>
          <Text style={{color:"#19224d", marginLeft: 20}}>{employeeData.position}</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="map-marker-radius" color="#19224d" size={20}/>
          <Text style={{color:"#19224d", marginLeft: 20}}>{employeeData.address}</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="phone" color="#19224d" size={20}/>
          <Text style={{color:"#19224d", marginLeft: 20}}>{employeeData.phone}</Text>
        </View>
        <View style={ProfileStyle.row}>
          <Icon name="email" color="#19224d" size={20}/>
          <Text style={{color:"#19224d", marginLeft: 20}}>{employeeData.email}</Text>
        </View>
      </View>

      {/* <View style={ProfileStyle.infoBoxWrapper}>
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
      </View> */}

      <View style={ProfileStyle.menuWrapper}>
        
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="account-check-outline" color="#19224d" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Hỗ trợ</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="settings-outline" color="#19224d" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Chỉnh sửa</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => dispatch(logout())}>
          <View style={ProfileStyle.menuItem}>
            <Icon name="logout" color="#19224d" size={25}/>
            <Text style={ProfileStyle.menuItemText}>Đăng xuất</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
