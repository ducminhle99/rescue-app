import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rescueApi } from '../api/rescueApi';

const CustomModal = (props) => {
    const { sendRescue } = props;
    const [title, setTitle] = useState();
    const [descripton, setDescripton] = useState();
    const [address, setAddress] = useState();
    const currenLocation = useSelector(state => state.location);
    const pressRecue = async () => {
        if (!title || !descripton || !address) {
            alert('Nhap du thong tin');
            return;
        }
        try {
            const res = await rescueApi.createRescue({
                "title": title,
                "description": descripton,
                "location": {
                    "latitude": currenLocation.coords.latitude,
                    "longitude": currenLocation.coords.longitude,
                    "name": address
                }
            })

            sendRescue();
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <ScrollView >
            <TextInput
                onChangeText={(text) => setTitle(text)}
                label="Nhập tiêu đề"
                style={styles.InputText}
                left={<TextInput.Icon name='car' />}
            />
            <TextInput
                onChangeText={(text) => setDescripton(text)}
                label='nội dung'
                multiline={true}
                style={styles.InputText}
                left={<TextInput.Icon name='comment' />}
            />

            <TextInput
                onChangeText={(text) => setAddress(text)}
                style={styles.InputText}
                label='Tên địa chỉ'
                left={<TextInput.Icon name='map' />}
            />
            <Button style={styles.button} mode='outlined' onPress={pressRecue}><Text>cứu hộ</Text></Button>
            <Button style={styles.button} mode='outlined' onPress={() => { sendRescue() }}><Text>huỷ</Text></Button>
        </ScrollView>
    );
};

export default CustomModal;

const styles = StyleSheet.create({
    InputText: {
        backgroundColor: '#fff',
        fontSize: 14
    },
    button: {
        flex: 1,
        marginHorizontal: 80,
        borderRadius: 24,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'blue'
    },
    Image: {
        height: 200,
    }
});
