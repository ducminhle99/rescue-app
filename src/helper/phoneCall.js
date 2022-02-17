import * as Linking from 'expo-linking';

const phoneCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`)
}

export default phoneCall;