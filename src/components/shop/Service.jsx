import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
const Service = (props) => {
    const { service } = props;
    const price = formatCash(service.price.toString());
    return (
        <View style={styles.container}>
            <Text style={styles.name}>{service.name}</Text>
            <Text style={styles.description}>{service.description}</Text>
            {(service.price)
                ? (<Text style={styles.price}>Giá: {price} vnđ</Text>)
                : (<Text style={styles.price}>Giá: liên hệ</Text>)
            }
        </View>
    );
};

export default Service;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        marginTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    name: {
        fontSize: 18,
        textTransform: 'capitalize',
        color: 'blue',
        fontWeight: 'bold',
    },
    description: {

    },
    price: {

        marginVertical: 10,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    }

});
