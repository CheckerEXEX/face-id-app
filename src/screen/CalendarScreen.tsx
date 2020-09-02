import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Item from "../common/component/Item";
import HeaderContent from "../common/header/HeaderContent";
import Loading from "../common/component/Loading";
import { Icon } from "react-native-elements";

const CalendarScreen = (props) => {
  const [hasItem, setHasItem] = useState(true);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [minDate, setMinDate] = useState("");

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

  const getMaxMinDate = () => {
    const date = new Date();
    let month = "" + date.getMonth(),
      day = "" + date.getDate(),
      year = date.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    console.log([year, month, "01"].join("-"));
    setMinDate([year, month, day].join("-"));
  };

  const onDateChange = (date) => {
    // setIsLoading(true);
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    const dValue = [year, month, day].join("-");
    setDataForItem(dValue);
    setHasItem(false);
    // setIsLoading(false);
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
        <HeaderContent
          navigation={props.navigation}
          title={"LỊCH SỬ CHẤM CÔNG"}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.body_top}>
          <CalendarPicker
            onDateChange={onDateChange}
            mode="date"
            format="YYYY-MM-DD"
            minDate={minDate}
            maxDate={new Date()}
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
                <Text style={styles.select_note}>Chọn ngày</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.body_bottom}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Icon size={15} name="circle" type="font-awesome" color="red" />
              <Text style={styles.text_bottom}>Số phút đi trễ: 15 phút</Text>
            </View>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Icon
                size={15}
                name="circle"
                type="font-awesome"
                color="#4eab52"
              />
              <Text style={styles.text_bottom}>
                Tổng số giờ tăng ca: 16 giờ
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Icon
                size={15}
                name="circle"
                type="font-awesome"
                color="#4eab52"
              />
              <Text style={styles.text_bottom}>
                Tổng số ngày công trong tháng: 22 ngày
              </Text>
            </View>
            <View style={{ flexDirection: "row", padding: 5 }}>
              <Icon
                size={15}
                name="circle"
                type="font-awesome"
                color="#4eab52"
              />
              <Text style={styles.text_bottom}>
                Số ngày nghỉ phép trong tháng: 0 ngày
              </Text>
            </View>
          </ScrollView>
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
  },
  title: {
    padding: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  body_top: {
    borderColor: "#4eab52",
    borderWidth: 1,
    borderRadius: 5,
    // height: "60%",
  },
  body_bottom: {
    padding: 0,
    // height: "40%",
  },
  select_note: {
    fontSize: 20,
    // color: "#4eab52",
    marginTop: 10,
  },
  text_bottom: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export default CalendarScreen;
