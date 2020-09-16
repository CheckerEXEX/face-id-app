import React from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import moment from 'moment';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";
import Item from "../common/component/Item";
import Loading from "../common/component/Loading";
import CalendarStrip from 'react-native-calendar-strip';

import BaseStyle from "../common/styles/base";

const DATA = [
  {
    id: "1",
    date: "Thứ 2 ngày 20-11-2020",
    checkIn: "07:52:11",
    checkOut: "18:23:20",
    color: "red",
  }
];

const renderItem = ({ item }) => <Item data={item} />;

const HistoryScreen = (props) => {
  const [isLoading, setIsLoading] = useStateIfMounted(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 1500);

  let datesWhitelist = [{
    start: moment(),
    end: moment().add(3, 'days')  // total 4 days enabled
  }];
  let datesBlacklist = [ moment().add(1, 'days') ]; // 1 day disabled

  return (
    <>
      <SafeAreaView style={BaseStyle.topSafeArea} />
      <SafeAreaView style={BaseStyle.bottomSafeArea}>
        <Loading isLoading={isLoading} />
        
        <View style={styles.body}>
        {/* <CalendarStrip
          scrollable
          style={{height:200, paddingTop: 20, paddingBottom: 10}}
          calendarColor={'#3343CE'}
          calendarHeaderStyle={{color: 'white'}}
          dateNumberStyle={{color: 'white'}}
          dateNameStyle={{color: 'white'}}
          iconContainer={{flex: 0.1}}
        /> */}
         <CalendarStrip
                    calendarAnimation={{type: 'parallel', duration: 500}}
                    daySelectionAnimation={{type: 'background', duration: 500, highlightColor: '#a91b4b'}}
                    style={{height: 100, paddingTop: 20, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#19224d'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    highlightDateNumberStyle={{color: 'yellow'}}
                    highlightDateNameStyle={{color: 'yellow'}}
                    disabledDateNameStyle={{color: 'grey'}}
                    disabledDateNumberStyle={{color: 'grey'}}
                    // datesWhitelist={datesWhitelist}
                    // datesBlacklist={datesBlacklist}
                    iconLeft={require('../common/styles/img/arrow-89-512.png')}
                    iconRight={require('../common/styles/img/arrow-25-512.png')}
                    iconContainer={{flex: 0.1}}
                    locale={locale}
                />
          <SafeAreaView>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View>
      </SafeAreaView>
    </>
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

const locale = {
  name: 'vi',
  config: {
    months: 'Tháng 1_Tháng 2_Tháng 3_Tháng 4_Tháng 5_Tháng 6_Tháng 7_Tháng 8_Tháng 9_Tháng 10_Tháng 11_Tháng 12'.split(
      '_'
    ),
    monthsShort: 'Thg 01_Thg 02_Thg 03_Thg 04_Thg 05_Thg 06_Thg 07_Thg 08_Thg 09_Thg 10_Thg 11_Thg 12'.split(
        '_'
    ),
    monthsParseExact: true,
    weekdays: 'chủ nhật_thứ hai_thứ ba_thứ tư_thứ năm_thứ sáu_thứ bảy'.split(
        '_'
    ),
    weekdaysShort: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysMin: 'CN_T2_T3_T4_T5_T6_T7'.split('_'),
    weekdaysParseExact: true,
    meridiemParse: /sa|ch/i,
    isPM: function (input) {
        return /^ch$/i.test(input);
    },
    meridiem: function (hours, minutes, isLower) {
        if (hours < 12) {
            return isLower ? 'sa' : 'SA';
        } else {
            return isLower ? 'ch' : 'CH';
        }
    },
    longDateFormat: {
        LT: 'HH:mm',
        LTS: 'HH:mm:ss',
        L: 'DD/MM/YYYY',
        LL: 'D MMMM [năm] YYYY',
        LLL: 'D MMMM [năm] YYYY HH:mm',
        LLLL: 'dddd, D MMMM [năm] YYYY HH:mm',
        l: 'DD/M/YYYY',
        ll: 'D MMM YYYY',
        lll: 'D MMM YYYY HH:mm',
        llll: 'ddd, D MMM YYYY HH:mm',
    },
    calendar: {
        sameDay: '[Hôm nay lúc] LT',
        nextDay: '[Ngày mai lúc] LT',
        nextWeek: 'dddd [tuần tới lúc] LT',
        lastDay: '[Hôm qua lúc] LT',
        lastWeek: 'dddd [tuần trước lúc] LT',
        sameElse: 'L',
    },
    relativeTime: {
        future: '%s tới',
        past: '%s trước',
        s: 'vài giây',
        ss: '%d giây',
        m: 'một phút',
        mm: '%d phút',
        h: 'một giờ',
        hh: '%d giờ',
        d: 'một ngày',
        dd: '%d ngày',
        M: 'một tháng',
        MM: '%d tháng',
        y: 'một năm',
        yy: '%d năm',
    },
    dayOfMonthOrdinalParse: /\d{1,2}/,
    ordinal: function (number) {
        return number;
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4, // The week that contains Jan 4th is the first week of the year.
    },
  }
};

export default HistoryScreen;
