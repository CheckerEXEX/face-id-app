import React from 'react';
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native';

// const DATA = [
//     {
//         id: "1",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "2",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "3",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "4",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "5",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "6",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "7",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "8",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     },
//     {
//         id: "9",
//         date: "2020-07-01",
//         checkIn: "8:00",
//         checkOut: "17:00"
//     }
// ];

// const Item = ({ data }) => (
//     <View>

//         <Text style={{ marginLeft: 15, fontSize: 15, fontWeight: 'bold' }}>{data.date}</Text>
//         <View style={styles.item}>
//             <Text style={styles.title}>Thời gian vào: {data.checkIn} Thời gian ra: {data.checkOut}</Text>
//         </View>
//     </View>
// );

// const renderItem = ({ item }) => (
//     <Item data={item} />
// );

function HomeScreen() {
    return (
        <View style={styles.container}>
            <Text>Danh sách check in trong tháng</Text>
            {/* <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    item: {
        backgroundColor: '#736710',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 15,
    },
})

export default HomeScreen;