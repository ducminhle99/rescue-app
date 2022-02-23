import { AntDesign, Feather } from '@expo/vector-icons';
import { getDistance } from 'geolib';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import colors from '../../constant/colors';
import { IMAGE_URL } from '../../constant/const';
import phoneCall from '../../helper/phoneCall';
import ShopTabTopNav from '../../navigation/ShopTabTopNav';
const { height, width } = Dimensions.get("window");
const ShopDetailScreen = (props) => {
    const { route, navigation } = props;
    const { id } = route.params;
    const [data, setData] = useState();
    const [distance, setDistance] = useState();
    const currentLocation = useSelector(state => state.location);

    useEffect(() => {
        const fetchShop = async () => {
            const shopDetail = await rescueApi.getShopDetail(id);

            const dist = getDistance({ latitude: shopDetail.address.latitude, longitude: shopDetail.address.longitude },
                { latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude }
            )
            const Distance = Math.round(dist / 1000 * 10) / 10;
            setDistance(Distance);
            setData(shopDetail)
        }
        fetchShop();
    }, [id])

    if (!data) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.mainColor }}>
            <ActivityIndicator animating={true} color='#fff' size={100} />
        </View>
    )

    return (
        <View style={styles.container}>
            <ScrollView
                stickyHeaderIndices={[1]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.shop_info}>
                    {(data.imageUrl === "")
                        ? (<ImageBackground style={styles.banner} source={require('../../../assets/avatar.jpg')} blurRadius={5}>
                            <Text style={styles.title}>{data.name}</Text>
                        </ImageBackground>)
                        : (<ImageBackground style={styles.banner} source={{ uri: IMAGE_URL + data.imageUrl }} blurRadius={5}>
                            <Text style={styles.title}>{data.name}</Text>
                        </ImageBackground>)
                    }
                    <View style={styles.info_detail}>
                        <Text style={styles.distance}>{distance} Km</Text>
                        <Text style={styles.email}>{data.email}</Text>
                        <Text style={styles.address}>{data.address.name}</Text>
                    </View>
                    <View style={styles.avatar}>
                        {(data.imageUrl === "") ? (<Image source={require('../../../assets/avatar.jpg')} style={{
                            width: 150,
                            height: 150,
                            borderWidth: 4,
                            borderColor: '#fff',
                            borderRadius: 20,
                        }} />) : (<Image source={{ uri: IMAGE_URL + data.imageUrl }} style={{
                            width: 150,
                            height: 150,
                            borderWidth: 4,
                            borderColor: '#fff',
                            borderRadius: 20,
                        }} />)}
                    </View>
                    <View style={styles.contact}>
                        <Button mode='outlined' style={styles.contact_btn, { flex: 6 }}
                            onPress={() => phoneCall(data.phone)}
                        >
                            <Feather name="phone-call" size={16} color="black" />
                            <Text> {data.phone}</Text>
                        </Button>
                        <Button mode='outlined' style={styles.contact_btn, { flex: 1 }}
                            onPress={() => navigation.push('Appointment', { shopId: data.id })}
                        >
                            <AntDesign name='pluscircleo' size={16} color='black' />
                        </Button>

                        <Button mode='outlined' style={styles.contact_btn, { flex: 1 }}
                            onPress={() => navigation.push('CallRescue', { shopId: data.id })}
                        >
                            <Text style={{ color: 'red', fontWeight: 'bold' }}>sos</Text>
                        </Button>
                    </View>
                </View>
                <View style={{ height: height }}>
                    <ShopTabTopNav data={data} />
                </View>

            </ScrollView>
        </View>

    );
};

export default ShopDetailScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        height: 150,
    },
    title: {
        position: 'absolute',
        bottom: 0,
        left: 200,
        right: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        paddingBottom: 10
    },
    avatar: {
        position: 'absolute',
        left: 25,
        top: 75,
        borderRadius: 20,
        elevation: 5,
    },
    info_detail: {
        padding: 10
    },
    distance: {
        position: 'absolute',
        top: 50,
        left: 200,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },

    email: {
        position: 'absolute',
        top: 10,
        left: 200,
        fontSize: 14,
        color: 'black'
    },
    address: {
        marginTop: 80,
    },

    contact: {
        flexDirection: 'row',
        flex: 1,
        paddingHorizontal: 10
    },
    contact_btn: {
        height: 40,
        borderRadius: 0,
        borderWidth: 1,
        borderColor: 'blue',
    }

});
