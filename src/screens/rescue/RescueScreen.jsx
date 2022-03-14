import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import Map from '../../components/map/Map';
import SosButton from '../../components/rescue/SosButton';
import { searchByCategory } from '../../helper/searchShop';

const RescueScreen = ({ navigation }) => {
    const shopList = useSelector(state => state.repairShop);
    const currenLocation = useSelector(state => state.location);
    const Sos = async () => {
        const list = searchByCategory(shopList, 1)
        const shops = list.slice(0, 5);
        const listId = shops.map(a => a.id)
        try {
            await rescueApi.createListRescue({
                "title": "Cứu hộ",
                "description": "Cứu hộ khẩn cấp",
                "location": {
                    "latitude": currenLocation.coords.latitude,
                    "longitude": currenLocation.coords.longitude,
                    "name": " "
                },
                "shops": listId
            })
            alert('Đã gửi thông báo đến các cơ sở gần nhất!')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <Map shopList={shopList} style={styles.map} navigation={navigation} />
            <View style={styles.header}>
                <Button
                    onPress={() => navigation.push('RescueList')}
                    style={styles.btn}
                    mode='outlined'
                ><Text>danh sách</Text>
                </Button>
            </View>
            <View style={styles.sos} >
                <TouchableOpacity onPress={Sos}>
                    <SosButton />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default RescueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 10
    },
    btn: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 30,
    },
    sos: {
        position: 'absolute',
        right: 0,
        bottom: 60
    }
});
