import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Item from '../../components/Item';
import { logout1, logout } from '../../redux/userSlice'
import { IMAGE_URL } from '../../constant/const'
import { useFocusEffect } from '@react-navigation/native';
const ProfileScreen = ({ navigation }) => {
    const dispath = useDispatch();
    const [user, setUser] = useState({});
    const userState = useSelector(state => state.user.user);
    // console.log(user);
    useFocusEffect(
        useCallback(() => {
            setUser(userState);
        }, [userState])
    )

    const handleLogout = () => {
        const action = logout();
        dispath(action);
        navigation.replace('SplashScreen')
    }

    // console.log(user);
    if (!user) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: "#fff" }}>
            <ActivityIndicator animating={true} color='blue' size={100} />
        </View>
    )
    else return (
        <View style={styles.container}>
            <StatusBar style='auto' />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground source={{ uri: IMAGE_URL + user.imageUrl }} style={{ height: 200 }} blurRadius={10} />
                <View style={{ alignSelf: 'center', position: 'absolute', top: 100 }}>
                    <Image
                        source={{ uri: IMAGE_URL + user.imageUrl }}
                        style={{ width: 200, height: 200, borderRadius: 100, borderWidth: 4, borderColor: '#fff' }} />
                </View>
                <View style={styles.profile_info}>
                    <Text style={{ fontSize: 18 }}>{user.fullName}</Text>
                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            alignItems: 'center'
                        }}
                    >
                        <Text>{user.phone}</Text>
                        <AntDesign name='phone' size={18} color='black' style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
                <View >
                    <Button
                        mode='outlined'
                        onPress={() => navigation.push('EditProfileScreen')}
                        style={styles.btn_edit}><Text>chỉnh sửa</Text></Button>
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.title_group}>thông tin cá nhân</Text>
                    <View style={styles.info_container} >
                        <Item title={user.fullName} />
                        <Item title={user.phone} />
                        <Item title={user.email} lastItem={true} />

                    </View>
                </View>
                {/* <View style={{ marginBottom: 20 }}>
                    <Text style={styles.title_group}>thông tin xe</Text>
                    <View style={styles.info_container} >
                        <Item title='Xe của tôi' pressItem={() => navigation.navigate('NewCarScreen')} />
                        <Item title='Lịch sử sửa chữa' pressItem={() => alert('lich su sua chua')} lastItem={true} />
                    </View>
                </View> */}

                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.title_group}>cài đặt</Text>
                    <View style={styles.info_container} >
                        <Item title='Đổi mật khẩu' pressItem={() => navigation.push('PasswordScreen')} />
                        <Item title='Đăng xuất' pressItem={handleLogout} lastItem={true} />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
    },
    profile_info: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 100
    },
    btn_edit: {
        marginHorizontal: 100,
        borderWidth: 2,
        borderColor: 'blue',
        borderRadius: 18,
        marginBottom: 20
    },
    info_container: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
    },
    title_group: {
        textTransform: 'capitalize',
        fontSize: 14,
        margin: 10
    }
});
