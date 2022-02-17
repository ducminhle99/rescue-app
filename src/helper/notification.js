import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});
Notifications.addNotificationResponseReceivedListener(noti => {

    console.log('da tat noti')
})
Notifications.addNotificationReceivedListener(noti => {
    console.log('da nhan noti')
})

const getNoti = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Ứng dụng không thể gửi và nhận thông báo!');
        }
    } else console.log('noti ok')

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    // console.log(token)
    return token;
}

export default getNoti;