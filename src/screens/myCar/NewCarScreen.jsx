import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Button, TextInput, RadioButton } from 'react-native-paper';
const NewCarScreen = () => {
    const [image, setImage] = useState(null);
    const [value, setValue] = React.useState('first');
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
        <ScrollView style={styles.container}>

            <RadioButton.Group onValueChange={value => setValue(value)} value={value}>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <RadioButton.Item label="Ô Tô" value="first" />
                    <RadioButton.Item label="Xe Máy" value="second" />

                </View>

            </RadioButton.Group>
            <TextInput
                label="nhap bien so xe"
                style={styles.InputText}
                left={<TextInput.Icon name='car' />}
            />
            <TextInput
                label='ten xe'
                multiline={true}
                style={styles.InputText}
                left={<TextInput.Icon name='car' />}
            />
            {image && <Image source={{ uri: image }} style={styles.Image} />}

            <Button
                style={styles.button}
                mode='outlined'
                onPress={pickImage}
            ><Text>Thêm ảnh</Text></Button>
            <Button style={styles.button} mode='outlined' onPress={() => alert('hello')}><Text>Lưu</Text></Button>
        </ScrollView>
    );
};

export default NewCarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 30,
        backgroundColor: '#fff',
        paddingTop: 30,
    },
    InputText: {
        backgroundColor: '#fff',
        fontSize: 14,
        marginHorizontal: 10
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
        width: 200,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginVertical: 20,
        borderRadius: 10
    }
});
