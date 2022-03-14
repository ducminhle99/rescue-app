import { Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import { rescueApi } from '../../api/rescueApi';
import phoneCall from '../../helper/phoneCall';

const NotiCard = (props) => {
    const { navigation, data } = props;
    const [shop, setShop] = useState();
    const date = new Date(data.updatedAt);
    const time = date.toLocaleDateString() + ' : ' + date.toLocaleTimeString();
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await rescueApi.getShopDetail(data.senderId);
                setShop(res);
            } catch (error) {
                console.log(error)
            }
        }
        getData()
    }, [])
    // console.log(data);
    if (shop) return (
        <View style={styles.container}>
            <Text style={styles.name}>{shop.name}</Text>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Text style={styles.time}>{time}</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Button
                    mode='outlined'
                    onPress={() => phoneCall(shop.phone)}
                    style={{ flex: 1 }}
                >
                    <Feather name="phone-call" size={16} color="blue" />
                    <Text> {shop.phone}</Text>
                </Button>
                <Button mode='outlined'
                    style={{ flex: 1 }}
                    onPress={() => navigation.navigate('ShopDetail', { id: shop.id })}
                >
                    <Text>xem cơ sở</Text>
                </Button>
            </View>


        </View>
    )
    else {
        console.log(data)
        return (
            <></>
        )
    }
}

export default NotiCard

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 5,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 10
    },
    name: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: 'blue',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: 'black'
    },
    description: {
        color: 'black'
    },
    time: {
        fontSize: 12,
        color: 'red'
    },
    btn_group: {
        flexDirection: 'row',
        flex: 1,
    },
})