import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import { AirbnbRating } from 'react-native-ratings';
import { rescueApi } from '../../api/rescueApi';
import colors from '../../constant/colors';
import { IMAGE_URL } from '../../constant/const';

const { height, width } = Dimensions.get("screen");
const width_card = width;
const height_card = width_card * 0.55

const FullShopCard = (props) => {
    const [rating, setRating] = useState(0);

    const { shopData, pressCard } = props;
    useEffect(() => {
        const getRating = async () => {
            const res = await rescueApi.getStatistic(shopData.id);
            setRating(res.rating);
        }
        getRating();
    }, [])

    return (
        <View style={{
            width: width_card,
        }}>
            <TouchableOpacity style={styles.container}
                onPress={() => pressCard(shopData.id)}
            >
                {(shopData.imageUrl === "")
                    ? (<Image source={require('../../../assets/avatar.jpg')} style={styles.avatar} />)
                    : (<Image source={{ uri: IMAGE_URL + shopData.imageUrl }} style={styles.avatar} />)
                }
                <View style={styles.info_group}>
                    <Text style={styles.title}>{shopData.name}</Text>
                    <Text style={styles.address} numberOfLines={3}>{shopData.address.name}</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', paddingTop: 5, maxHeight: 75, overflow: 'hidden' }}>
                        {shopData.categories.map(cat => (
                            <Chip key={cat.id} textStyle={{ fontSize: 10 }} style={{ height: 20, justifyContent: 'center', alignItems: 'center', marginVertical: 2 }} mode='outlined' onPress={() => console.log('Pressed')}>{cat.catName}</Chip>
                        ))
                        }
                    </View>
                    <Text style={styles.phone}>{shopData.phone}</Text>
                    <Text style={styles.distance}>{shopData.distance} Km</Text>

                    <View style={styles.rating}>
                        <AirbnbRating
                            isDisabled={true}
                            reviews={false}
                            count={5}
                            defaultRating={rating}
                            size={20}
                        />
                    </View>
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
    },
    rating: {
        width: '100%',
        position: 'absolute',
        bottom: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

