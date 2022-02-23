import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import NotiCard from '../../components/noti/NotiCard';
const Notification = () => {
    const [notiList, setNotiList] = useState([]);
    const user = useSelector(state => state.user);
    const userId = user.user.id;
    useFocusEffect(
        useCallback(() => {
            const fetchNoti = async () => {
                try {
                    const res = await rescueApi.fetchNoti();
                    setNotiList(res);
                    // console.log(res);
                } catch (error) {
                    console.log(error)
                }
            }
            fetchNoti();
        }, [])
    )

    // useEffect(() => {
    //     const fetchNoti = async () => {
    //         try {
    //             const res = await rescueApi.fetchNoti();
    //             setNotiList(res);
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchNoti();
    // }, [])
    // console.log(notiList);
    return (
        <View style={styles.container}>
            {notiList.map(noti => {
                return (<NotiCard key={noti.id} data={noti} />)
            })
            }
        </View>
    );
};

export default Notification;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});