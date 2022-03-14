import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import AppointnentCard from '../../components/appoinent/AppointnentCard';
import { setAppointnent } from '../../redux/appointnentSlice';
import Modal from "react-native-modal";
import { Button } from 'react-native-paper';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useFocusEffect } from '@react-navigation/native';

const AppointnentList = ({ navigation }) => {
    const appointnents = useSelector(state => state.appointnent)
    const dispatch = useDispatch();
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    useFocusEffect(
        useCallback(() => {
            const getAll = async () => {
                try {
                    const res = await rescueApi.fetchAppointment();
                    const action = setAppointnent(res)
                    dispatch(action);
                } catch (error) {
                    console.log(error)
                }
            }
            getAll()
        }, [])
    )

    return (
        <View>
            <ScrollView
                style={styles.listService}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                {appointnents.map(appointnent => {
                    return (
                        <AppointnentCard navigation={navigation} key={appointnent.id} appointnent={appointnent} showModal={toggleModal} />
                    )
                })}
            </ScrollView>
            <Modal isVisible={isModalVisible} style={styles.bottomModal} onBackdropPress={toggleModal}>
                <View style={{ backgroundColor: '#fff', height: 200, justifyContent: 'center', alignItems: 'center' }}>
                    <Rating
                        showRating
                        onFinishRating={() => console.log('ok')}
                        style={{ paddingVertical: 10 }}
                    />
                    <Button
                        style={{
                            width: '30%',
                            marginVertical: 20,
                            borderColor: 'blue',
                            borderWidth: 2,
                            borderRadius: 30
                        }}
                        mode='outlined'
                        onPress={toggleModal}
                    ><Text>ok</Text></Button>
                </View>
            </Modal>
        </View>

    );
}
export default AppointnentList
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,

    },
    name: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: 'blue',
        fontWeight: 'bold',
    },
    description: {

    },
    price: {

        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    btn_group: {
        flexDirection: 'row',
        flex: 1,
    },
    notFinish: {
        position: 'absolute',
        right: 0,
        padding: 10,
        backgroundColor: '#dee3e3',
        width: 100,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center'
    },
    finish: {
        position: 'absolute',
        right: 0,
        padding: 10,
        backgroundColor: '#9aa5ed',
        width: 100,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center'
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },

});
