import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { rescueApi } from '../api/rescueApi';
import { AirbnbRating } from 'react-native-ratings';
import { Divider } from 'react-native-paper';
import Service from '../components/shop/Service'
import RatingCard from '../components/ratings/RatingCard';
const Tab = createMaterialTopTabNavigator();
function About(props) {
    const { data, rating } = props;
    return (
        <View >
            <ScrollView nestedScrollEnabled={true} style={styles.about}>
                <Text>{data}</Text>
                <Divider />
                <Text style={{ fontSize: 18, }}>Đánh giá</Text>
                <AirbnbRating
                    isDisabled={true}
                    reviews={false}
                    count={5}
                    defaultRating={rating}
                    size={20}
                />
                <RatingCard />
                <RatingCard />
                <RatingCard />
                <RatingCard />
                <View style={{ height: 300 }} ></View>
            </ScrollView>
        </View>
    );
}

function Services(props) {
    const { data } = props

    return (

        <ScrollView
            style={styles.listService}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
        >
            {
                data.map(service => {
                    return <Service key={service.id} service={service} />
                })
            }
        </ScrollView>
    );
}
const ShopTabTopNav = (props) => {
    const { data } = props;
    const [services, setServices] = useState([]);
    useEffect(() => {
        const getService = async () => {
            const res = await rescueApi.fetchService(data.id);
            setServices(res);
        }
        getService();
    }, [])
    return (
        <Tab.Navigator>
            <Tab.Screen name="About"
                options={{
                    title: "Giới thiệu"
                }}>
                {() => <About data={data.about} rating={data.rating} />}
            </Tab.Screen>
            <Tab.Screen name="Services"
                options={{
                    title: "Dịch vụ"
                }}
            >
                {() => <Services data={services} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
};

export default ShopTabTopNav;

const styles = StyleSheet.create({
    listService: {
        flex: 1,
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 100,
    },
    about: {
        paddingHorizontal: 10,
        paddingTop: 10
    }
})

