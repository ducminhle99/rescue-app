import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListRepairShop from '../../components/shopCard/ListRepairShop';
import { useSelector } from 'react-redux';
import { searchByCategory } from '../../helper/searchShop';

const RescueList = ({ navigation }) => {
    const shopList = useSelector(state => state.repairShop);
    const list = searchByCategory(shopList, 1)
    // console.log(list);

    return (
        <View style={styles.container}>
            <ListRepairShop shopList={list} navigation={navigation} horizontal={false} />
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
