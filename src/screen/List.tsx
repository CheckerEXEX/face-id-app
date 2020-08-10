import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import Item from "../common/Item";

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

// const Item = ({ data }) => (
//   <View style={styles.item}>
//     <View style={styles.date}>
//       <Text style={styles.titleDate}>{data.date}</Text>
//     </View>
//     <View
//       style={{
//         flexDirection: "row",
//         alignItems: "center",
//         justifyContent: "center",
//       }}
//     >
//       <Image style={styles.image} source={require("../../assets/avatar.png")} />
//       <Text style={styles.checkInText}>
//         <Text style={{ color: data.color }}>{data.checkIn}</Text>
//       </Text>
//       <Icon name="clock-o" type="font-awesome" color="#4eab52" size={30} />
//       <Text style={styles.checkOutText}>
//         <Text style={{ color: data.color }}>{data.checkOut}</Text>
//       </Text>
//       <Image style={styles.image} source={require("../../assets/avatar.png")} />
//     </View>
//   </View>
// );

const renderItem = ({ item }) => <Item data={item} />;

const ListScreen = ({ navigation: { goBack } }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View style={{ width: "25%" }}>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <Button
                  onPress={() => goBack()}
                  title="Quay lại"
                  color="black"
                />
              </View>
            </View>
            <View style={{ width: "50%" }}>
              <View
                style={{
                  alignItems: "center",
                }}
              >
                <Text style={styles.title}>DANH SÁCH LOG</Text>
              </View>
            </View>
            <View style={{ width: "25%" }}></View>
          </View>
        </SafeAreaView>
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
    backgroundColor: "#4eab52",
    justifyContent: "center",
    alignItems: "center",
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
