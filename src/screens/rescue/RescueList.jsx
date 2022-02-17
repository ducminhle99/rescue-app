import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListRepairShop from '../../components/shopCard/ListRepairShop';

const RescueList = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <ListRepairShop pressCard={(data) => navigation.navigate('ShopDetail', { data })} horizontal={false} />
        </View>
    );
};

export default RescueList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
