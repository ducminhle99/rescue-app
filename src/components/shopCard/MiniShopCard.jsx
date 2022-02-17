import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../constant/colors';

const MiniShopCard = (props) => {
    const { shopData, pressCard } = props;
    return (
        <TouchableOpacity style={styles.container}
            onPress={() => pressCard(shopData.id)}
        >
            {(shopData.imageUrl === "")
                ? (<Image source={require('../../../assets/avatar.jpg')} style={styles.avatar} />)
                : (<Image source={{ uri: shopData.imageUrl }} style={styles.avatar} />)
            }
            <View style={styles.info_group}>
                <Text style={styles.title}>{shopData.name}</Text>
                <Text style={styles.address}>dia chi: {shopData.address.name}</Text>
                <Text style={styles.phone}>{shopData.phone}</Text>
                <Text style={styles.distance}>{shopData.distance} Km</Text>
            </View>
        </TouchableOpacity>

    );
};

export default MiniShopCard;
const { height, width } = Dimensions.get("screen");
const width_card = width * 0.75
const height_card = width_card * 0.6
const styles = StyleSheet.create({
    container: {
        marginLeft: 10,
        marginVertical: 10,
        width: width_card,
        height: height_card,
        flexDirection: 'row',
        padding: 5,
        backgroundColor: colors.background,
        borderRadius: 5,
        elevation: 5,
    },
    avatar: {
        width: '40%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    info_group: {
        flex: 1,
        paddingLeft: 2
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    phone: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 2,
        color: 'blue'
    },
    distance: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        color: 'red'
    }
});
