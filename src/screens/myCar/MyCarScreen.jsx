import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MyCarScreen = () => {
    return (
        <View style={styles.container}>
            <Text>my car</Text>
        </View>
    );
};

export default MyCarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
