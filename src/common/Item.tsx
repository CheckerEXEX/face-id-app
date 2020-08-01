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
        <Text style={styles.checkInText}>
          <Text style={{ color: props.data.color }}>{props.data.checkIn}</Text>
        </Text>
        <Icon name="clock-o" type="font-awesome" color="#4eab52" size={30} />
        <Text style={styles.checkOutText}>
          <Text style={{ color: props.data.color }}>{props.data.checkOut}</Text>
        </Text>
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
    marginLeft: "6%",
    marginRight: "8%",
    fontSize: 14,
  },
  checkOutText: {
    marginRight: "6%",
    marginLeft: "8%",
    fontSize: 14,
  },
});

export default Item;
