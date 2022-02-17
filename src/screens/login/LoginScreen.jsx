import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import colors from '../../constant/colors';
import { login } from '../../redux/userSlice';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispath = useDispatch();

    const handleLogin = () => {
        const loginFunc = async () => {
            try {
                const userRes = await rescueApi.login({
                    email: email,
                    password: password
                });
                // console.log(userRes);
                const { accessToken, ...user } = userRes;
                const action = login({
                    user, accessToken
                })
                dispath(action);
                navigation.replace('MainScreen')
            } catch (error) {
                alert('Đăng nhập thất bại! Nhập lại email và mật khẩu')
            }
        }
        loginFunc();
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <Text style={styles.header_text}>Đăng Nhập!</Text>
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <AntDesign name='user' size={20} color='black' />
                    <TextInput
                        autoComplete='email'
                        onChangeText={(userEmail) => setEmail(userEmail)}
                        placeholder='your email'
                        style={styles.input_text}
                        autoCapitalize='none'
                    />
                </View>

                <Text style={styles.text_footer}>Password</Text>
                <View style={styles.action}>
                    <AntDesign name='lock' size={20} color='black' />
                    <TextInput
                        onChangeText={(userPassword) => setPassword(userPassword)}
                        placeholder='your password'
                        style={styles.input_text}
                        autoCapitalize='none'
                        secureTextEntry={true}
                    />
                </View>

                <TouchableOpacity>
                    <Text style={{ color: colors.mainColor, marginTop: 15 }}>Quên mật khẩu</Text>
                </TouchableOpacity>

                <View style={styles.button} >
                    <TouchableOpacity
                        style={styles.login}
                        onPress={handleLogin}
                    >
                        <LinearGradient
                            style={styles.login}
                            colors={[colors.main2Color, colors.mainColor]}
                        >

                            <Text style={styles.btn_text}>Đăng nhập</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.login, {
                            borderColor: colors.mainColor,
                            borderWidth: 1,
                            marginTop: 15
                        }]}
                        onPress={() => navigation.push('RegiserScreen')}
                    >
                        <Text style={[styles.btn_text, {
                            color: colors.mainColor
                        }]}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View >
        </View >
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
    },
    header: {
        flex: 2,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    header_text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 20
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    input_text: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
    },

    button: {
        alignItems: 'center',
        marginTop: 50,
        marginHorizontal: 20
    },
    login: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    btn_text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff'
    }

})