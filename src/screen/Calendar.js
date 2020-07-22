import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

function CalendarScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Headers</Text>
            </View>
            <View style={styles.body} />
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
        backgroundColor: 'skyblue'
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
    }
})

export default CalendarScreen;
