import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import colors from '../constant/colors';
import getCurrentLocation from '../helper/location';
import { setLocation } from '../redux/locationSlice';
import SplashScreen from '../screens/splash/SplashScreen';
import AuthStackNav from './AuthStackNav';
import BottomNav from './BottomNav';
const RootStack = createStackNavigator();

const RootStackNav = () => {
    const location = useSelector(state => state.location);
    const dispatch = useDispatch()
    useEffect(() => {
        const getLocal = async () => {
            const location = await getCurrentLocation();
            const action = setLocation(location);
            dispatch(action);
        }
        getLocal();
    }, [])
    if (location) {
        return (
            <NavigationContainer>
                <RootStack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                >
                    <RootStack.Screen name='SplashScreen' component={SplashScreen} />
                    <RootStack.Screen name='AuthScreen' component={AuthStackNav} />
                    <RootStack.Screen name='MainScreen' component={BottomNav} />
                </RootStack.Navigator>
            </NavigationContainer>
        );
    }
    else return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.mainColor }}>
            <ActivityIndicator animating={true} color='#fff' size={100} />
        </View>
    )

};

export default RootStackNav;
