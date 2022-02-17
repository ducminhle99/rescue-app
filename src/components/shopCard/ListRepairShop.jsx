import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import FullShopCard from './FullShopCard';
import MiniShopCard from './MiniShopCard';
const ListRepairShop = (props) => {
    const { horizontal, navigation, shopList } = props;
    const clickCard = (id) => {
        navigation.navigate('ShopDetail', { id })
    }
    return (

        (horizontal === true) ? (<FlatList
            keyExtractor={item => item.id}
            data={shopList.slice(0, 10)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <MiniShopCard shopData={item} pressCard={clickCard} />
            )}
        />) : (
            <FlatList

                maxToRenderPerBatch={10}
                keyExtractor={item => item.id}
                data={shopList}
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <FullShopCard shopData={item} pressCard={clickCard} />
                )}
            />
        )
    );
};

export default ListRepairShop;

const styles = StyleSheet.create({
    list: {

    }
});
