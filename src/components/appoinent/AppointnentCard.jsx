import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Button } from 'react-native-paper';
import phoneCall from '../../helper/phoneCall';


const AppointnentCard = (props) => {
    const { navigation, appointnent, showModal } = props;
    const [data, setData] = useState();
    const date = new Date(appointnent.time);
    const time = date.toLocaleDateString() + ' : ' + date.toLocaleTimeString();
    useEffect(() => {
        setData(appointnent);
    }, [])

    // console.log(data)
    if (!data) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
            <ActivityIndicator animating={true} color='blue' size={100} />
        </View>
    )
    else return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.repair_shop.name}</Text>
            <Text style={styles.description}>{data.description}</Text>
            <Text style={styles.price}>{time}</Text>
            <View style={styles.btn_group}>
                <Button mode='outlined' style={{ flex: 4 }}
                    onPress={() => phoneCall(data.repair_shop.phone)}
                >
                    <Feather name="phone-call" size={16} color="blue" />
                    <Text> {data.repair_shop.phone}</Text>
                </Button>
                {
                    (data.isConfirmed) ?
                        (<Button mode='outlined' style={{ flex: 2, }}

                            onPress={() => navigation.navigate('ShopDetail', { id: data.repair_shop.id })}
                        >
                            <Text>xem cơ sở</Text>

                        </Button>)
                        : (
                            <Button mode='outlined' style={{ flex: 2 }}
                                onPress={() => navigation.navigate('ShopDetail', { id: data.repair_shop.id })}
                            >
                                <Text>xem cơ sở</Text>
                            </Button>
                        )
                }
            </View>
            {
                (data.isConfirmed) ?
                    (<View style={styles.finish}>
                        <Text style={{ color: '#fff' }}>Đã xác nhận</Text>
                    </View>) :
                    (<View style={styles.notFinish}>
                        <Text style={{ color: '#fff' }}>Đang chờ</Text>
                    </View>)
            }
        </View>
    )
}
export default AppointnentCard
const styles = StyleSheet.create({
    container: {
        marginHorizontal: 5,
        marginTop: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        elevation: 5
    },
    name: {
        width: '75%',
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
    },
    btn_group: {
        flexDirection: 'row',
        flex: 1,
    },
    notFinish: {
        position: 'absolute',
        right: 0,
        padding: 10,
        backgroundColor: '#dee3e3',
        width: 100,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center'
    },
    finish: {
        position: 'absolute',
        right: 0,
        padding: 10,
        backgroundColor: '#9aa5ed',
        width: 100,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        alignItems: 'center'
    }

});
