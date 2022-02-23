import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppointnentList from '../screens/appointnent/AppointnentList';
import HomeScreen from '../screens/home/HomeScreen';
import NewCarScreen from '../screens/myCar/NewCarScreen';
import Notification from '../screens/noti/Notification';
import ChangePassword from '../screens/profile/ChangePassword';
import EditProfileScreen from '../screens/profile/EditProfileScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import RescueListScreen from '../screens/rescue/RescueList';
import RescueScreen from '../screens/rescue/RescueScreen';
import Appointment from '../screens/shop/Appointment ';
import CallRescue from '../screens/shop/CallRescue';
import ListShopScreen from '../screens/shop/ListShopScreen';
import ShopDetailScreen from '../screens/shop/ShopDetailScreen';

const CustomButtonBar = ({ children, onPress }) => (
    <TouchableOpacity
        style={{
            justifyContent: "center",
            alignItems: "center",
        }}
        onPress={onPress}
    >
        <View style={{
            width: 60,
            height: 60,
            backgroundColor: 'blue',
            borderRadius: 30,
            borderWidth: 3,
            borderColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',

            marginBottom: Platform.OS == "android" ? 30 : 10,
        }}>
            <FontAwesome5 name='tools' color="#fff" size={20} />

        </View>

    </TouchableOpacity>
)

// group stack screens
const HomeStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const RescueStack = createStackNavigator();
const AppointnentStack = createStackNavigator();
const ProfileStack = createStackNavigator();

// screen component
const Home = () => (
    <HomeStack.Navigator >
        <HomeStack.Screen
            component={HomeScreen}
            name='HomeScreen'
            options={{
                headerShown: false,
                title: 'Trang chủ'
            }}
        />
        <HomeStack.Screen
            component={ListShopScreen}
            name='ListShopScreen'
            options={{
                headerShown: false,
            }}
        />
        <HomeStack.Screen
            component={ShopDetailScreen}
            name='ShopDetail'
            options={{
                title: 'Dịch vụ'
            }}
        />
        <HomeStack.Screen
            component={Appointment}
            name='Appointment'
            options={{
                title: 'Đặt lịch hẹn dịch vụ'
            }}
        />
        <HomeStack.Screen
            component={CallRescue}
            name='CallRescue'
            options={{
                title: 'Gọi cứu hộ'
            }}
        />
    </HomeStack.Navigator>
)

const Noti = () => (
    <NotificationStack.Navigator >
        <NotificationStack.Screen
            component={Notification}
            name='Notification'
            options={{
                title: "Thông báo"
            }}
        />
    </NotificationStack.Navigator>
)

const Rescue = () => (
    <RescueStack.Navigator >
        <RescueStack.Screen
            component={RescueScreen}
            name='RescueScreen'
            options={{
                headerShown: false
            }}
        />
        <RescueStack.Screen
            component={RescueListScreen}
            name='RescueList'
            options={{
                title: 'Danh sách cứu hộ'
            }}
        />
    </RescueStack.Navigator>
)

const Appoint = () => (
    <AppointnentStack.Navigator >
        <AppointnentStack.Screen
            component={AppointnentList}
            name='AppointnentList'
            options={{
                title: 'Lịch hẹn'
            }}
        />
    </AppointnentStack.Navigator>
)


const Profile = () => (
    <ProfileStack.Navigator
    >
        <ProfileStack.Screen
            component={ProfileScreen}
            name='ProfileScreen'
            options={{
                headerShown: false
            }}
        />
        <ProfileStack.Screen
            component={EditProfileScreen}
            name='EditProfileScreen'
            options={{
                title: 'Cập nhật thông tin'
            }}
        />
        <ProfileStack.Screen
            component={ChangePassword}
            name='PasswordScreen'
            options={{
                title: 'Đổi mật khẩu'
            }}
        />
        <ProfileStack.Screen
            component={NewCarScreen}
            name='NewCarScreen'
            options={{
                title: 'Thông tin xe'
            }}
        />
    </ProfileStack.Navigator>
)


const Tab = createBottomTabNavigator();
const BottomNav = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,

            }}
        >
            <Tab.Screen component={Home} name='Home'
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='home' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen component={Noti} name='noti'
                options={{
                    title: 'Thông báo',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='bells' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen component={Rescue} name='rescue'
                options={{
                    title: 'Cứu hộ',
                    tabBarButton: (props) => <CustomButtonBar {...props} />
                }}
            />
            <Tab.Screen component={Appoint} name='Appoint'
                options={{
                    title: 'Lịch',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='calendar' size={size} color={color} />
                    )
                }}
            />
            <Tab.Screen component={Profile} name='profile'
                options={{
                    title: 'Tài khoản',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name='user' size={size} color={color} />
                    )
                }}
            />
        </Tab.Navigator>
    );
};

export default BottomNav;
