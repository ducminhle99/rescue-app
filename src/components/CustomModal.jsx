import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const CustomModal = (props) => {
    const { sendRescue } = props;
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    }
    return (
        <ScrollView >
            <TextInput
                label="Nhập biển số xe"
                style={styles.InputText}
                left={<TextInput.Icon name='car' />}
            />
            <TextInput
                label='nội dung'
                multiline={true}
                style={styles.InputText}
                left={<TextInput.Icon name='comment' />}
            />
            {image && <Image source={{ uri: image }} style={styles.Image} />}

            <Button
                style={styles.button}
                mode='outlined'
                onPress={pickImage}
            ><Text>chọn ảnh</Text></Button>
            <TextInput
                style={styles.InputText}
                label='Vi trí'
                left={<TextInput.Icon name='map' />}
            />
            <Button style={styles.button} mode='outlined' onPress={() => { sendRescue() }}><Text>cứu hộ</Text></Button>
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
