import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Icon } from 'react-native-elements'
import { AuthContext } from '../common/AuthContext';

function LoginScreen() {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const { signIn } = useContext(AuthContext);

    return (
        <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.container}
        >
            <Text style={styles.title}>Đăng nhập</Text>
            <View style={styles.action}>
                <Icon
                    color='gray'
                    name='user-o'
                    size={15}
                    type='font-awesome'
                    style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    placeholderTextColor='gray'
                    placeholder='Tài khoản'
                    onChangeText={text => setemail(text)} />
            </View>
            <View style={styles.action}>
                <Icon
                    color='gray'
                    name='key'
                    size={15}
                    type='font-awesome'
                    style={styles.icon} />
                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholderTextColor='gray'
                    placeholder='Mật khẩu'
                    onChangeText={text => setpassword(text)} />

            </View>
            <View style={styles.button_container}>
                <TouchableOpacity style={styles.loginBtn} onPress={() => signIn(email, password)}>
                    <Text style={styles.loginText} >Đăng nhập</Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'gray',
                    fontSize: 10,
                    paddingBottom: 20
                }} >hoặc đăng nhập với Face ID</Text>
                <Icon
                    reverse
                    name='camera'
                    type='font-awesome'
                    color='#4eab52'
                    onPress={() => console.log('hello')} />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: 'gray',
        margin: 20,
        fontSize: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    action: {
        flexDirection: 'row',
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#FFF',
        paddingLeft: 20,
        shadowOffset: { width: 5, height: 5, },
        shadowColor: 'gray',
        shadowOpacity: 0.5,
        marginTop: 10,
        width: 300,

    },
    textInput: {
        flex: 1,
        color: 'gray',
        height: 45,
        padding: 5

    },
    button_container: {
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        marginTop: 13,
        paddingRight: 15
    },
    loginBtn: {
        width: 300,
        borderRadius: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        margin: 10,
        backgroundColor: '#4eab52'
    },
    loginText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    }
});

export default LoginScreen;