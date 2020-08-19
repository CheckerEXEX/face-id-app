import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import Item from "../common/component/Item";
import HeaderContent from "../common/header/HeaderContent";
import Loading from "../common/component/Loading";

const DATA = [
  {
    id: "1",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
    color: "red",
  },
  {
    id: "2",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "3",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "4",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
    color: "red",
  },
  {
    id: "5",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "6",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "7",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "8",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
  {
    id: "9",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
  },
];

const renderItem = ({ item }) => <Item data={item} />;

const ListScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  return (
    <View style={styles.container}>
      <Loading isLoading={isLoading} />
      <View style={styles.header}>
        <HeaderContent
          navigation={props.navigation}
          title={"LỊCH SỬ CHẤM CÔNG"}
        />
      </View>
      <View style={styles.body}>
        <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  header: {
    width: "100%",
    height: "10%",
  },
  body: {
    width: "100%",
    height: "90%",
    backgroundColor: "#f0f0f0",
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  item: {
    backgroundColor: "#FFF",
    margin: 10,
    height: 90,
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "gray",
    shadowOpacity: 1,
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
  // iconTitle: {
  //   paddingTop: 12,
  // },
});

export default ListScreen;
