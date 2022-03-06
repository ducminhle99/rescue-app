import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AirbnbRating } from 'react-native-ratings';

const RatingCard = () => {
    return (
        <View style={styles.container}>
            <Text>nguyen van a</Text>
            <AirbnbRating
                isDisabled={true}
                reviews={false}
                count={5}
                defaultRating={3}
                size={12}
            />
            <Text>tuyet voi chat luong dich vu rat tot</Text>
        </View>
    )
}

export default RatingCard

const styles = StyleSheet.create({
    container: {

    }
})