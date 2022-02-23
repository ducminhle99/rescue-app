import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput, ImageBackground, Image } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { rescueApi } from '../../api/rescueApi';
import { uploadFile } from '../../api/fileService';
import { IMAGE_URL } from '../../constant/const';
import { setUser } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';

const EditProfileScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user);
    const [fullName, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');
    const [isChangeImg, setIsChangeImg] = useState(false);

    useEffect(() => {
        setFullname(user.fullName);
        setEmail(user.email);
        setPhone(user.phone);
        setAvatar(user.imageUrl)
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setAvatar(result.uri)
            setIsChangeImg(true);
        }
    }

    const uploadAvatar = async () => {
        if (avatar === '') return '';
        const file = await uploadFile(avatar);
        return file.path;
    }

    const updateUser = async () => {
        const image = await uploadAvatar(avatar);
        // console.log(image);
        try {
            const userRes = await rescueApi.updateUser({
                fullName: fullName,
                email: email,
                phone: phone,
                imageUrl: image
            })
            // console.log(userRes);
            const action = setUser({ user: userRes });
            dispatch(action);
            navigation.navigate('ProfileScreen');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {(isChangeImg)
                        ? (<ImageBackground source={{ uri: avatar }} style={{ height: 200 }} blurRadius={10} />)
                        : (<ImageBackground source={{ uri: IMAGE_URL + avatar }} style={{ height: 200 }} blurRadius={10} />)

                    }

                    <View style={{ alignSelf: 'center', position: 'absolute', top: 100 }}>
                        {(isChangeImg)
                            ? (<Image
                                source={{ uri: avatar }}
                                style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 4, borderColor: '#fff' }} />)
                            : (<Image
                                source={{ uri: IMAGE_URL + avatar }}
                                style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 4, borderColor: '#fff' }} />)
                        }

                        <View style={styles.btn_change_avt}>
                            <TouchableOpacity
                                onPress={pickImage}
                            >
                                <AntDesign name='form' color='black' size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={styles.info_container}>
                    <Text style={styles.lable}>ho va ten</Text>
                    <TextInput mode='flat' value={fullName} style={styles.input_text} onChangeText={text => setFullname(text)} />

                    <Text style={styles.lable}>so dien thoai</Text>
                    <TextInput mode='flat' value={phone} style={styles.input_text} keyboardType='numeric' onChangeText={text => setPhone(text)} />

                    <Text style={styles.lable}>email</Text>
                    <TextInput mode='flat' editable={false} value={email} style={styles.input_text} onChangeText={text => setEmail(text)} />

                </View>
                <Button mode='outlined' style={styles.btn_save}
                    onPress={updateUser}
                ><Text>Lưu thông tin</Text></Button>
            </ScrollView>
        </View>
    );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avt_group: {
        alignItems: 'center',
    },
    btn_change_avt: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 16,
        right: 14,
        padding: 4,
        height: 32,
        width: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info_container: {
        marginTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 150
    },
    lable: {
        fontSize: 16,
        textTransform: 'capitalize',
        paddingTop: 10
    },
    input_text: {
        fontSize: 14,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 5,
        borderWidth: 1,
        paddingHorizontal: 10

    },
    btn_save: {
        marginTop: 20,
        marginHorizontal: 120,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 18,
        marginBottom: 20
    }
});
