import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Modal from "react-native-modal";
import { Button, Divider, TextInput } from 'react-native-paper';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { rescueApi } from '../api/rescueApi';
import RatingCard from '../components/ratings/RatingCard';
import Service from '../components/shop/Service';
const Tab = createMaterialTopTabNavigator();
function About(props) {
    const { data, shopId } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [rate, setRate] = useState(0);
    const [review, setReview] = useState(0);
    const [ratings, setRatings] = useState([]);
    const [rating, setRating] = useState();
    const [comment, setComment] = useState('');
    useEffect(() => {
        const fetchStatistic = async () => {
            const statistic = await rescueApi.getStatistic(shopId);
            // console.log(statistic)
            const res = statistic.rating.toFixed(2);
            setRate(res);
            setReview(statistic.review);
        }
        const fetchRating = async () => {
            const res = await rescueApi.getRatings(shopId);
            setRatings(res);
            // console.log(res)
        }
        fetchStatistic();
        fetchRating();
    }, [review])
    // console.log(data)
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const submitRating = async () => {
        if (!rating) alert('hãy nhập đánh giá !');
        const res = await rescueApi.createRating({
            "rating": rating,
            "comment": comment,
            "shopId": shopId
        })
        // console.log(res);
        toggleModal();
        setReview(review + 1);

    }
    const ratingCompleted = (rating) => {
        // console.log("Rating is: " + rating)
        setRating(rating);
    }
    return (
        <View >
            <ScrollView nestedScrollEnabled={true} style={styles.about}>
                <Text>{data}</Text>
                <Divider />
                <Text style={{ fontSize: 18, }}>Đánh giá ({review}) {rate}</Text>
                <View style={{ height: 50, paddingBottom: 25, borderBottomWidth: 1, justifyContent: 'center' }}>
                    <AirbnbRating
                        isDisabled={true}
                        reviews={false}
                        count={5}
                        defaultRating={rate}
                        size={20}
                    />
                </View>
                {
                    ratings.map(rating => {
                        return (<RatingCard key={rating.id} data={rating} />)
                    })
                }

                <Button mode='outlined' style={styles.button} onPress={() => toggleModal()}><Text>đánh giá</Text></Button>
                <View style={{ height: 300 }} ></View>
                <Modal isVisible={isModalVisible} style={styles.bottomModal} onBackdropPress={toggleModal}>
                    <View style={{ backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
                        <Rating
                            showRating
                            onFinishRating={ratingCompleted}
                            style={{ paddingVertical: 10 }}

                        />
                        <TextInput
                            mode='outlined'
                            multiline={true}
                            style={{ width: '80%', borderColor: 'blue' }}
                            onChangeText={text => setComment(text)}
                        />
                        <Button style={{ width: '30%', marginVertical: 20, borderColor: 'blue', borderWidth: 2, borderRadius: 30 }} mode='outlined' onPress={submitRating} ><Text>ok</Text></Button>
                    </View>
                </Modal>
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
                {() => <About data={data.about} shopId={data.id} />}
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
    },
    button: {
        marginHorizontal: 80,
        borderRadius: 24,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'blue'
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})

