import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';

const CallRescue = (props) => {
    const { navigation, route } = props;
    const { shopId } = route.params;
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
                },
                'shopId': shopId
            })
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <View style={styles.container}>
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
            <Button style={styles.button} mode='outlined' onPress={() => navigation.goBack()}><Text>huỷ</Text></Button>
        </View>
    );
};

export default CallRescue;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        paddingTop: 50
    },
    InputText: {
        backgroundColor: '#fff',
        fontSize: 14
    },
    button: {
        marginHorizontal: 80,
        borderRadius: 24,
        marginVertical: 10,
        borderWidth: 2,
        borderColor: 'blue'
    },
});
