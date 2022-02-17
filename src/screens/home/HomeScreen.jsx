import { AntDesign, Feather } from '@expo/vector-icons';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { Button, Card } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import ListRepairShop from '../../components/shopCard/ListRepairShop';
import { getLocalAccessToken } from '../../redux/localStorage';
import { setRepairShop } from '../../redux/shopSlice'

const images = [
    'https://hyundainguyengiaphat.vn/upload/images/xe-sua-chua-luu-dong.jpg',
    'https://top1danang.com/StoreData/files/hoc-sua-chua-o-to-o-da-nang.jpg',
    'https://www.top10danang.com/wp-content/uploads/2019/04/gara-o-to-da-nang-2.png',
    'https://otohyundai-danang.com/wp-content/uploads/2021/12/Hyundai-Da-Nang-Bao-Duong-591x400.png',
    'https://otohathanh.com/upload/images/anh-tet-mobile.jpg',
    'https://danangreviews.vn/wp-content/uploads/2018/12/Cuu-Ho-O-To-Da-Nang.jpg',
    'https://quangcaotructuyen24h.vn/wp-content/uploads/2021/10/madza-da-nang-768x576.jpg',
]
const HomeScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const shopList = useSelector(state => state.repairShop);
    const location = useSelector(state => state.location);
    useEffect(() => {
        const fetchListShop = async () => {
            const list = await rescueApi.fetchShop();
            const action = setRepairShop({ list, location });
            dispatch(action);
        }
        fetchListShop();
    }, [])
    const pressCard = (id) => {
        navigation.navigate('ShopDetail', { id })
    }
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.slider_container}>
                    <SliderBox
                        images={images}
                        dotStyle={{ height: 10 }}
                        sliderBoxHeight={300}
                        autoplay={true}
                        circleLoop={true}
                    />
                    <View style={styles.card_group}>
                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('ListShopScreen')}>
                                <Card.Cover source={{ uri: 'https://www.go4it.ro/wp-content/uploads/2021/02/waze-car.jpg' }} style={styles.card_image} />
                                <Text style={styles.card_title}>Tìm dịch vụ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('rescue')}>
                                <Card.Cover source={{ uri: 'https://suaotohaiphong.com/wp-content/uploads/2021/06/cuu-ho-o-to-hai-phong-1.jpg' }} style={styles.card_image} />
                                <Text style={styles.card_title}>Gọi cứu hộ</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('profile')}>
                                <Card.Cover source={{ uri: 'https://cdn.canhco.net/files/2020/01/1_zing-2.jpg' }} style={styles.card_image} />
                                <Text style={styles.card_title}>Lịch hẹn dịch vụ</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.card}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('profile')}>
                                <Card.Cover source={{ uri: 'https://carwow-uk-wp-3.imgix.net/Volvo-XC40-white-scaled.jpg' }} style={styles.card_image} />
                                <Text style={styles.card_title}>Xe của tôi</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.services}>
                        <Text style={styles.title}>Dịch vụ</Text>

                        <TouchableOpacity
                            style={styles.more}
                            onPress={() => navigation.push('ListShopScreen')}>
                            <Text style={{ color: 'blue' }} >xem thêm <AntDesign name="doubleright" size={14} color="blue" /></Text>
                        </TouchableOpacity>
                        <View style={styles.service_group}>
                            <ListRepairShop shopList={shopList} navigation={navigation} pressCard={pressCard} horizontal={true} />
                        </View>
                        <View style={styles.footer}>
                            <View style={styles.contact}>
                                <Button mode='outlined' style={styles.contact_btn}
                                    onPress={() => alert('call')}
                                >
                                    <Feather name="phone-call" size={16} color="black" />
                                    <Text>03365997</Text>
                                </Button>
                                <AntDesign name="facebook-square" size={24} color="black" style={styles.contact_icon} />
                                <AntDesign name="google" size={24} color="black" style={styles.contact_icon} />
                            </View>
                            <Text style={styles.footer_tilte}>Copyright<AntDesign name="copyright" size={14} color="black" /> 2022 ducminh. All rights reserved!</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;
const { height, width } = Dimensions.get("screen");
const width_card = width * 0.45
const height_card = width_card * 0.6
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    card_group: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 10
    },
    card: {
        margin: 5,
    },
    card_image: {
        width: width_card,
        height: height_card,
        borderRadius: 10
    },
    card_title: {
        position: 'absolute',
        bottom: 15,
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: 'bold',

        padding: 10,
        textShadowColor: 'black',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
    },
    title: {
        fontWeight: '900',
        fontSize: 16,
        marginLeft: 10,
        color: 'black',
    },
    more: {
        position: 'absolute',
        right: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        backgroundColor: '#fff',
        padding: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingBottom: 50,
    },
    contact: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: 20
    },
    contact_btn: {
        flex: 3,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'blue',
    },
    contact_icon: {
        marginLeft: 20
    },
    footer_tilte: {
        flex: 1,
        alignSelf: 'center'
    }
})
