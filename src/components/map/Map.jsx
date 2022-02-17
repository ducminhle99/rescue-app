import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import getCurrentLocation from '../../helper/location';


const Map = (props) => {
    const { clickCallout, rescue, shopList, navigation } = props;

    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    useEffect(() => {
        const getLocation = async () => {
            const currentLocation = await getCurrentLocation();
            setLatitude(currentLocation.coords.latitude);
            setLongitude(currentLocation.coords.longitude);
        }
        getLocation();
    }, []);

    const Region = {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    }


    return (
        <View style={styles.container}>
            {
                latitude && longitude && <MapView
                    style={styles.map}
                    initialRegion={Region}
                >
                    {
                        shopList.map((data) => {

                            const id = data.id
                            return (
                                <Marker
                                    onCalloutPress={() => navigation.navigate('ShopDetail', { id })}
                                    key={data.id}
                                    image={require('../../../assets/car-service.png')}
                                    coordinate={{
                                        latitude: parseFloat(data.address.latitude),
                                        longitude: parseFloat(data.address.longitude),
                                        latitudeDelta: 0.1,
                                        longitudeDelta: 0.1
                                    }
                                    }
                                    title={data.name}
                                    description={data.address.name}
                                />
                            )
                        }
                        )
                    }
                    <Marker
                        image={require('../../../assets/car.png')}
                        coordinate={Region}
                        title='Vị trí hiện tại'
                        description='Vị trí được định vị trên thiết bị của bạn'
                    >
                        <Marker
                            image={require('../../../assets/car.png')}
                            coordinate={Region}
                            title='your position'
                            description='your curent location'
                        ></Marker>

                    </Marker>
                    {(rescue) ? (<Circle center={{
                        latitude: Region.latitude,
                        longitude: Region.longitude,
                    }}
                        radius={10000}
                        strokeColor="#FF0000"
                        strokeOpacity={0.8}
                        strokeWidth={2}
                        fillColor='rgba(255, 0, 0, 0.1)'
                    />) : (<></>)}


                </MapView>
            }

        </View>
    );
};

export default Map;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

});
