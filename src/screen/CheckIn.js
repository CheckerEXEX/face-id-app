import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Location from 'expo-location';
import { set } from 'react-native-reanimated';

function CheckInScreen() {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [locationName, setLocationName] = useState(null);


    useEffect(() => {
        if (!locationName) {
            (async () => {
                let { status } = await Location.requestPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Không tìm thấy vị trí vui lòng thử lại !');
                }
                let location = await Location.getCurrentPositionAsync({});
                let nameLocation = await Location.reverseGeocodeAsync({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude
                })
                setLocationName(nameLocation);
                setLocation(location);
            })();
        }
    });


    let street = '';
    let city = '';
    let text = '';

    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        locationName.find(item => {
            street = item.street,
                city = item.region
        })
        text = street + ' - ' + city;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}></Text>
            </View>
            <View style={styles.body}>
                <Text style={styles.position}>Vị trí hợp lệ: {text} </Text>
                <View style={styles.camera}>
                    <Icon
                        reverse
                        name='camera'
                        type='font-awesome'
                        color='#4eab52'
                        size={80}
                        onPress={() => console.log('hello')} />
                </View>
            </View>
            <View style={styles.footer} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    header: {
        width: '100%',
        height: '10%',
        backgroundColor: 'powderblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    body: {
        width: '100%',
        height: '80%',
        backgroundColor: 'skyblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        width: '100%',
        height: '10%',
        backgroundColor: 'steelblue'
    },
    title: {
        paddingTop: 35,
        padding: 10,
        fontSize: 20
    },
    position: {
        fontSize: 20
    },
    camera: {
        marginTop: 20
    }
})

export default CheckInScreen;
