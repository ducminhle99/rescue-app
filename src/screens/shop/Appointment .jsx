import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, Button } from 'react-native-paper';
import { rescueApi } from '../../api/rescueApi';
const Appointment = (props) => {
    const { navigation, route } = props;
    const { shopId } = route.params;
    const [desc, setDesc] = useState('');
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    // console.log(date);
    const handleSend = async () => {
        if (!date || !desc || !shopId) {
            alert('Nhập đầy đủ thông tin');
            return;
        }
        try {
            const res = await rescueApi.createAppointment({
                "time": date,
                "description": desc,
                "shopId": shopId
            })
            navigation.goBack();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}> Nội dung đặt lịch </Text>
            <TextInput
                onChangeText={text => setDesc(text)}
                mode='outlined'
                multiline={true}
                style={styles.input}
            />
            <Text style={styles.title}>Thời gian</Text>


            <View style={styles.time_group}>
                <TouchableOpacity onPress={showDatepicker}>
                    <Text style={styles.text_btn}>Chọn ngày</Text>
                </TouchableOpacity>
                <Text style={styles.time}>{date.toLocaleDateString()} </Text>
            </View>
            <View style={styles.time_group}>
                <TouchableOpacity onPress={showTimepicker}>
                    <Text style={styles.text_btn}>Chọn giờ </Text>
                </TouchableOpacity>
                <Text style={styles.time}> {date.toLocaleTimeString()}</Text>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
            <Button style={styles.btn2} mode='outlined' onPress={handleSend}><Text>Gửi</Text></Button>
        </View>
    )
}

export default Appointment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 10
    },
    title: {
        fontSize: 18,
        marginVertical: 10
    },
    input: {
        height: 200
    },
    time_group: {
        flexDirection: 'row',
        marginVertical: 10,
        alignItems: 'center'
    },
    text_btn: {
        color: 'blue',
        fontSize: 16,
        marginRight: 20
    },

    btn2: {
        width: 100,
        alignSelf: 'center',
        marginTop: 50,
        borderColor: 'blue',
        borderWidth: 2,
        borderRadius: 10
    }
})