import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { Avatar, Button } from 'react-native-paper';

const ChangePassword = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.info_container}>
                    <Text style={styles.lable}>nhap mat khau</Text>
                    <TextInput mode='flat' style={styles.input_text} />

                    <Text style={styles.lable}>mat khau moi</Text>
                    <TextInput mode='flat' style={styles.input_text} />

                    <Text style={styles.lable}>nhap lai mat khau</Text>
                    <TextInput mode='flat' style={styles.input_text} />
                </View>
                <Button mode='outlined' style={styles.btn_save}
                    onPress={() => navigation.navigate('ProfileScreen')}

                ><Text>luu thong tin</Text></Button>
            </ScrollView>
        </View>
    );
};

export default ChangePassword;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 5
    },
    info_container: {
        marginTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        borderRadius: 10
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
        paddingHorizontal: 5

    },
    btn_save: {
        marginTop: 20,
        marginHorizontal: 100,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 18,
        marginBottom: 20
    }
});
