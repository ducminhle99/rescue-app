import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN } from '../constant/const';

export const getLocalAccessToken = async () => {
    try {
        const token = await AsyncStorage.getItem(AUTH_TOKEN);
        if (token === null) {
            return null;
        }
        return JSON.parse(token);
    } catch (err) {
        console.warn(err);
        return null;
    }
}

export const setLocalAccessToken = async (token) => {
    try {
        const data = JSON.stringify(token);
        await AsyncStorage.setItem(AUTH_TOKEN, data);
    } catch (err) {
        console.warn(err)
    }
};

export const deleteLocalAccessToken = async () => {
    try {
        await AsyncStorage.removeItem(AUTH_TOKEN);
    } catch (err) {
        console.warn(err)
    }
};
