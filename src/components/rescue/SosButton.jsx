import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const SosButton = () => {
    return (
        <View style={styles.constainer}>
            <View style={styles.btn}>
                <Text style={styles.title}>SOS</Text>
            </View>
        </View>
    )
}

export default SosButton

const styles = StyleSheet.create({
    constainer: {
        padding: 10
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 80,
        width: 80,
        backgroundColor: 'red',
        borderRadius: 50,
        elevation: 10,
        borderWidth: 4,
        borderColor: "#fff"
    },
    title: {
        fontSize: 24,
        color: "#fff",
        fontWeight: 'bold'
    }
})