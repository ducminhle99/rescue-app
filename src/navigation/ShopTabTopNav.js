import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { rescueApi } from '../api/rescueApi';
import Service from '../components/shop/Service'
const Tab = createMaterialTopTabNavigator();
function About(props) {
    const { data } = props;
    return (
        <View >
            <ScrollView nestedScrollEnabled={true} style={styles.about}>
                <Text style={styles.text}>{data}</Text>
            </ScrollView>
        </View>
    );
}

function Services(props) {
    const { data } = props
    // console.log(data);
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
                {() => <About data={data.about} />}
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

