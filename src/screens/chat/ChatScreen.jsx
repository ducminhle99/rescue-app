import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { uploadFile } from '../../api/fileService';
const ChatScreen = () => {
    const [profileImage, setProfileImage] = useState('');

    const openImageLibrary = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
        }

        if (status === 'granted') {
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
            });

            if (!response.cancelled) {
                setProfileImage(response.uri);
            }
        }
    };

    const uploadProfileImage = async () => {
        // const data = getDataToUpload(profileImage);
        const file = await uploadFile(profileImage);
        // console.log(file);
    };

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    onPress={openImageLibrary}
                    style={styles.uploadBtnContainer}
                >
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={{ width: '100%', height: '100%' }}
                        />
                    ) : (
                        <Text style={styles.uploadBtn}>Upload Profile Image</Text>
                    )}
                </TouchableOpacity>
                <Text style={styles.skip}>Skip</Text>
                {profileImage ? (
                    <Text
                        onPress={uploadProfileImage}
                        style={[
                            styles.skip,
                            { backgroundColor: 'green', color: 'white', borderRadius: 8 },
                        ]}
                    >
                        Upload
                    </Text>
                ) : null}
            </View>
        </View>
    );
};

export default ChatScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    uploadBtnContainer: {
        height: 200,
        width: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'dashed',
        borderWidth: 1,
        overflow: 'hidden',
    },
    uploadBtn: {
        textAlign: 'center',
        fontSize: 16,
        opacity: 0.3,
        fontWeight: 'bold',
    },
    skip: {
        textAlign: 'center',
        padding: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 2,
        opacity: 0.5,
    },
});