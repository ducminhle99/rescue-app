import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';

const Item = (props) => {
    const { title, pressItem, lastItem } = props;
    return (
        (lastItem === true) ? (
            <TouchableOpacity style={[styles.container, { marginHorizontal: 10 }]}
                onPress={pressItem}>
                <Text>{title}</Text>
                <AntDesign name="right" size={24} color="gray" />
            </TouchableOpacity>
        ) : (<View style={{ borderBottomWidth: 1, borderColor: 'gray', marginHorizontal: 10 }}>
            <TouchableOpacity style={styles.container}
                onPress={pressItem}>
                <Text>{title}</Text>
                <AntDesign name="right" size={24} color="gray" />
            </TouchableOpacity>

        </View>)


    );
};

export default Item;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        marginBottom: 10

    }

});
