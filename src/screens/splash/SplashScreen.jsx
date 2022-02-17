import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useDispatch } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import colors from '../../constant/colors';
import { getLocalAccessToken } from '../../redux/localStorage';
import { setUser } from '../../redux/userSlice';
const SplashScreen = ({ navigation }) => {
    const [token, setToken] = useState();
    const dispatch = useDispatch();
    useEffect(() => {
        const getCurrenUser = async () => {
            setTimeout(async () => {
                const token = await getLocalAccessToken();
                if (!token) navigation.replace('AuthScreen');
                else {
                    const user = await rescueApi.getCurrentUser();
                    const action = setUser({ user: user });
                    dispatch(action);
                    navigation.replace('MainScreen');
                }
            }, 1000)
        }
        getCurrenUser();
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <View style={styles.header}>
                <Animatable.Image
                    animation='bounceIn'
                    duration={500}
                    source={require('../../../assets/logo.png')}
                    style={styles.logo}
                    resizeMode='stretch'
                />
                <Animatable.Text
                    animation="bounceIn"
                    easing="ease-out"
                    duration={500}
                ><Text style={styles.title}>Cứu hộ 24h</Text>
                </Animatable.Text>
            </View>
        </View >
    );
};


export default SplashScreen;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.mainColor
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: height_logo,
        height: height_logo,
        borderRadius: height_logo / 2,
        marginBottom: 50
    },
    title: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
})