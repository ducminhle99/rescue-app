import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import colors from '../../constant/colors';
import getNoti from '../../helper/notification';
const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [notiToken, setNotiToken] = useState('');
    useEffect(() => {
        const getNotiToken = async () => {
            const token = await getNoti();
            setNotiToken(token);
        }
        getNotiToken()
    }, [])
    const handleRegister = () => {
        if (password1 !== password2) {
            alert('Nhập sai mật khẩu!');
            return;
        }
        const registerFunc = async () => {
            const body = {
                fullName: name,
                password: password1,
                phone: phone,
                email: email,
                notificationToken: notiToken
            }
            console.log(body);
            try {
                const res = await rescueApi.register(body)
                console.log(res);
                alert('Đăng ký thành công, kiểm tra email của bạn');
                navigation.push('LoginScreen')
            } catch (err) {
                alert(err.message)
            }
        }
        registerFunc();
    }
    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <Text style={styles.header_text}>Đăng ký!</Text>
            </View>
            <Animatable.View
                style={styles.footer}
                animation='fadeInUpBig'
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <Text style={styles.text_footer}>Họ và tên</Text>
                    <View style={styles.action}>
                        <AntDesign name='user' size={20} color='black' />
                        <TextInput
                            onChangeText={(text) => setName(text)}
                            placeholder='your name'
                            style={styles.input_text}
                            autoCapitalize='none'
                        />
                    </View>


                    <Text style={styles.text_footer}>Email</Text>
                    <View style={styles.action}>
                        <AntDesign name='mail' size={20} color='black' />
                        <TextInput
                            onChangeText={(text) => setEmail(text)}
                            placeholder='your email'
                            style={styles.input_text}
                            autoCapitalize='none'
                            autoComplete='email'
                        />
                    </View>

                    <Text style={styles.text_footer}>Điện thoại</Text>
                    <View style={styles.action}>
                        <AntDesign name='phone' size={20} color='black' />
                        <TextInput
                            onChangeText={(text) => setPhone(text)}
                            placeholder='your phone number'
                            keyboardType='numeric'
                            style={styles.input_text}
                            autoCapitalize='none'
                        />
                    </View>

                    <Text style={styles.text_footer}>Mật khẩu</Text>
                    <View style={styles.action}>
                        <AntDesign name='lock' size={20} color='black' />
                        <TextInput
                            onChangeText={(text) => setPassword1(text)}
                            placeholder='your password'
                            style={styles.input_text}
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={styles.text_footer}>Nhập lại mật khẩu</Text>
                    <View style={styles.action}>
                        <AntDesign name='lock' size={20} color='black' />
                        <TextInput
                            onChangeText={(text) => setPassword2(text)}
                            placeholder='your password'
                            style={styles.input_text}
                            autoCapitalize='none'
                            secureTextEntry={true}
                        />
                    </View>
                    <View style={styles.button} >
                        <TouchableOpacity
                            style={styles.login}
                            onPress={handleRegister}
                        >
                            <LinearGradient
                                style={styles.login}
                                colors={[colors.main2Color, colors.mainColor]}
                            >
                                <Text style={styles.btn_text}>Đăng ký</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.login, {
                                borderColor: colors.mainColor,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                            onPress={() => navigation.push('LoginScreen')}
                        >
                            <Text style={[styles.btn_text, {
                                color: colors.mainColor
                            }]}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

            </Animatable.View >
        </View >
    );
};

export default RegisterScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor,
    },
    header: {
        flex: 1,
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
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 30
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
        marginHorizontal: 20,
        marginBottom: 10
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
        fontWeight: 'bold'
    }

})
