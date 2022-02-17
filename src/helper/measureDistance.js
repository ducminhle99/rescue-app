import { getDistance } from 'geolib';
import getCurrentLocation from './location';

const measureDistance = async (lat, long) => {
    const currentLocation = await getCurrentLocation();
    const distance = await getDistance(
        { latitude: lat, longitude: long },
        { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
    )
    return distance;
}

export default measureDistance;
