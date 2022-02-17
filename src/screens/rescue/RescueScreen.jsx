import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, Modal } from 'react-native-paper';
import { useSelector } from 'react-redux';
import CustomModal from '../../components/CustomModal';
import Map from '../../components/map/Map';

const RescueScreen = ({ navigation }) => {
    const shopList = useSelector(state => state.repairShop);
    const [visible, setVisible] = useState(false);
    const [rescue, setRescue] = useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const sendRescue = () => {
        setRescue(true);
        hideModal();
    }
    const containerStyle = { backgroundColor: 'white', padding: 20, marginHorizontal: 10, borderRadius: 10 };
    return (
        <View style={styles.container}>
            <Map shopList={shopList} style={styles.map} rescue={rescue} navigation={navigation} />
            <View style={styles.header}>
                <Button
                    onPress={showModal}
                    style={styles.btn} mode='outlined'
                ><Text>gọi cứu hộ</Text>
                </Button>
                <Button
                    onPress={() => navigation.push('RescueList')}
                    style={styles.btn}
                    mode='outlined'
                ><Text>danh sách</Text>
                </Button>
            </View>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                <CustomModal sendRescue={() => sendRescue()} />
            </Modal>
        </View>
    );
};

export default RescueScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 30,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: '#fff',
        borderRadius: 30,
        elevation: 10
    },
    btn: {
        flex: 1,
        borderWidth: 0,
        borderRadius: 30,
    }
});
