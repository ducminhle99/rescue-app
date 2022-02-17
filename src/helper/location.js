import * as Location from "expo-location";

const getCurrentLocation = async () => {
    let location = null;
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('khong the dinh vi duoc vi tri hien tai!');
            return;
        };
    }
    location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest
    });

    return location;
}
export default getCurrentLocation;