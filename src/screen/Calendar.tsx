import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Alert } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Item from "../common/Item";
import * as moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

const DATA = {
  id: "1",
  date: "Thứ 2 ngày 20-11-2020",
  checkIn: "07:52:11",
  checkOut: "18:23:20",
  color: "red",
};

const CalendarScreen = () => {
  const [hasItem, setHasItem] = useState(true);
  const [data, setData] = useState({});
  const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const onDateChange = (date: any) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const dValue = [year, month, day].join("-");
    setDataForItem(dValue);
    setHasItem(false);
  };

  const setDataForItem = (dates) => {
    setData({
      id: "1",
      date: dates,
      checkIn: "07:52:11",
      checkOut: "18:23:20",
      color: "red",
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SafeAreaView>
          <Text style={styles.title}>CALENDAR</Text>
        </SafeAreaView>
      </View>
      <View style={styles.body}>
        <View style={styles.calendar}>
          <CalendarPicker
            onDateChange={onDateChange}
            mode="date"
            format="YYYY-MM-DD"
            minDate="2020-07-01"
            maxDate="2020-08-30"
            weekdays={weekdays}
            months={months}
            previousTitle={"Quay lại"}
            nextTitle={"Kế tiếp"}
            selectMonthTitle={"Chọn tháng "}
            selectYearTitle={" Chọn năm"}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {!hasItem ? (
            <Item data={data} />
          ) : (
            <Text style={styles.select_note}>Không có dữ liệu</Text>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: "100%",
    height: "10%",
    backgroundColor: "#4eab52",
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    paddingTop: 10,
    padding: 5,
    width: "100%",
    height: "90%",
    backgroundColor: "#f0f0f0",
    // justifyContent: "center",
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#ebecf1",
  },
  calendar: {
    borderColor: "#4eab52",
    borderWidth: 1,
    borderRadius: 5,
  },
  select_note: {
    fontSize: 20,
    color: "#4eab52",
    marginTop: 10,
  },
});

export default CalendarScreen;
