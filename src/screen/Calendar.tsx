import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Item from "../common/component/Item";
import HeaderContent from "../common/header/HeaderContent";
import Loading from "../common/component/Loading";

const CalendarScreen = (props) => {
  const [hasItem, setHasItem] = useState(true);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const weekdays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];
  const months = [];
  //months
  for (let i = 1; i <= 12; i++) {
    months.push("Tháng " + i);
  }

  const onDateChange = (date) => {
    setIsLoading(true);
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const dValue = [year, month, day].join("-");
    setDataForItem(dValue);
    setHasItem(false);
    setIsLoading(false);
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
      <Loading isLoading={isLoading} />
      <View style={styles.header}>
        <HeaderContent navigation={props.navigation} title={"CALENDAR LOG"} />
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
            previousTitle={"<"}
            nextTitle={">"}
            selectMonthTitle={"Chọn tháng "}
            selectYearTitle={" Chọn năm"}
          />
          <View>
            {!hasItem ? (
              <Item data={data} />
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.select_note}>Không tìm thấy dữ liệu</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <ActivityIndicator size="large" />
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
    color: "black",
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
