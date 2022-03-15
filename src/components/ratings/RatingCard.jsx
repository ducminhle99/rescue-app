import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AirbnbRating } from 'react-native-ratings';
import { Avatar } from 'react-native-paper';
import { IMAGE_URL } from '../../constant/const';

const RatingCard = (props) => {
    const { data } = props;
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                <Avatar.Image size={34} source={{ uri: IMAGE_URL + data.user.imageUrl }} style={{ marginRight: 10 }} />
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>{data.user.fullName}</Text>
            </View>
            <View style={{ height: 25 }}>
                <View style={styles.rating}>
                    <AirbnbRating
                        isDisabled={true}
                        reviews={false}
                        count={5}
                        defaultRating={data.rating}
                        size={12}
                    />
                </View>
            </View>

            <Text style={styles.comment}>{data.comment}</Text>
        </View>
    )
}

export default RatingCard

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        borderColor: 'gray',
        paddingBottom: 10
    },
    rating: {
        position: 'absolute',
        height: 10,
        justifyContent: 'center',
        marginBottom: 10,
        left: 0,
        top: 0
    },
    comment: {

    }

})