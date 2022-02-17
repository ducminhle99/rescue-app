import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import colors from '../../constant/colors';

const { height, width } = Dimensions.get("screen");
const width_card = width;
const height_card = width_card * 0.55

const FullShopCard = (props) => {

    const { shopData, pressCard } = props;

    return (
        <View style={{
            width: width_card,
        }}>
            <TouchableOpacity style={styles.container}
                onPress={() => pressCard(shopData.id)}
            >
                {(shopData.imageUrl === "")
                    ? (<Image source={require('../../../assets/avatar.jpg')} style={styles.avatar} />)
                    : (<Image source={{ uri: shopData.imageUrl }} style={styles.avatar} />)
                }
                <View style={styles.info_group}>
                    <Text style={styles.title}>{shopData.name}</Text>
                    <Text style={styles.address} numberOfLines={3}>{shopData.address.name}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 5, maxHeight: 75, overflow: 'hidden' }}>
                        <Chip icon="apple" textStyle={{ fontSize: 10 }} style={{ height: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 2 }} mode='outlined' onPress={() => console.log('Pressed')}>cu ho xe oto</Chip>
                        <Chip icon="information" textStyle={{ fontSize: 10 }} style={{ height: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 2 }} mode='outlined' onPress={() => console.log('Pressed')}>sua chua xe</Chip>
                        <Chip icon="car" textStyle={{ fontSize: 10 }} style={{ height: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 2 }} mode='outlined' onPress={() => console.log('Pressed')}>bao duong xe</Chip>
                    </View>
                    <Text style={styles.phone}>{shopData.phone}</Text>
                    <Text style={styles.distance}>{shopData.distance} Km</Text>
                </View>
            </TouchableOpacity>
        </View>

    );
};
export default FullShopCard;


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: height_card,
        flexDirection: 'row',
        marginVertical: 5,
        padding: 5,
        backgroundColor: colors.background,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,

    },
    avatar: {
        width: '40%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 5,
    },
    info_group: {
        flex: 1,
        paddingLeft: 5
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    phone: {
        position: 'absolute',
        bottom: 10,
        marginLeft: 5,
        color: 'blue'
    },
    address: {

    },
    distance: {
        position: 'absolute',
        bottom: 10,
        right: 5,
        color: 'red'
    }
});
