import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image, Icon } from "react-native-elements";

const Item = (props) => {
  return (
    <View style={styles.item}>
      <View style={styles.date}>
        <Text style={styles.titleDate}>{props.data.date}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          style={styles.image}
          source={require("../../assets/avatar.png")}
        />
        <View style={styles.time_Left}>
          <Icon
            name="clock-o"
            type="font-awesome"
            color="#4eab52"
            size={14}
            style={styles.icon}
          />
          <Text style={styles.checkInText}>
            <Text style={{ color: props.data.color }}>
              {props.data.checkIn}
            </Text>
          </Text>
        </View>

        <Text>|</Text>
        {/* <Icon name="clock-o" type="font-awesome" color="#4eab52" size={30} /> */}
        <View style={styles.time_Right}>
          <Icon
            name="clock-o"
            type="font-awesome"
            color="#4eab52"
            size={14}
            style={styles.icon}
          />
          <Text style={styles.checkOutText}>
            <Text style={{ color: props.data.color }}>
              {props.data.checkOut}
            </Text>
          </Text>
        </View>
        <Image
          style={styles.image}
          source={require("../../assets/avatar.png")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    margin: 10,
    height: 90,
    padding: 10,
    borderRadius: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "#4eab52",
    shadowOpacity: 0.2,
    borderColor: "#4eab52",
    borderWidth: 1,
  },
  date: {
    justifyContent: "center",
    alignItems: "center",
  },
  titleDate: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#4eab52",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  checkInText: {
    fontSize: 14,
    marginLeft: 2,
  },
  checkOutText: {
    fontSize: 14,
    marginLeft: 2,
  },
  time_Left: {
    flexDirection: "row",
    marginRight: "7%",
    marginLeft: "5%",
  },
  time_Right: {
    flexDirection: "row",
    marginRight: "5%",
    marginLeft: "7%",
  },
  icon: {
    marginTop: 1,
  },
});

export default Item;
