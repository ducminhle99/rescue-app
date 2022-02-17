import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Appbar, Chip } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { rescueApi } from '../../api/rescueApi';
import ListRepairShop from '../../components/shopCard/ListRepairShop';
import { searchByCategory, searchListShop } from '../../helper/searchShop';
const ListShopScreen = ({ navigation }) => {
    const shopList = useSelector(state => state.repairShop);
    const [shops, setSearchlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState();
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState(false);
    useEffect(() => {
        const getCat = async () => {
            const listCat = await rescueApi.fetchCategories();

            listCat.forEach(cat => {
                cat.isSelected = false;
            });
            listCat.unshift({ id: 0, catName: 'Tất cả', isSelected: true })
            setCategories(listCat);
        }
        getCat();
        setSearchlist(shopList);
    }, [])

    const searchShop = (keyword) => {
        const list = searchListShop(shopList, keyword);
        setSearchlist(list);
    }
    const serchCategory = (catId) => {
        const listCat = categories.map(cat => {
            if (cat.id === catId) return { ...cat, isSelected: true }
            else return { ...cat, isSelected: false };
        })
        const list = searchByCategory(shopList, catId);
        setSearchlist(list);

        setCategories(listCat);
    }
    // console.log(categories);
    return (
        <View style={styles.container}>
            {
                search ? (<Appbar.Header style={styles.Appbar}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <View style={styles.search}>
                        <TextInput style={styles.editText} onChangeText={(value) => setSearchQuery(value)} onSubmitEditing={() => searchShop(searchQuery)} />
                    </View>
                    <Appbar.Action icon="close" onPress={() => setSearch(false)} />
                </Appbar.Header>) : (
                    <Appbar.Header style={styles.Appbar}>
                        <Appbar.BackAction onPress={() => navigation.goBack()} />
                        <Text style={styles.title}>Danh sách cơ sở</Text>
                        <Appbar.Action icon="magnify" onPress={() => setSearch(true)} />
                    </Appbar.Header>
                )
            }
            <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={styles.category}
            >{
                    categories.map(category => (<Chip selected={category.isSelected} style={{ justifyContent: 'center', backgroundColor: '#fff', marginHorizontal: 8 }} key={category.id} onPress={() => serchCategory(category.id)}>{category.catName}</Chip>))
                }
            </ScrollView>
            <ListRepairShop style={styles.listShop} shopList={shops} navigation={navigation} horizontal={false} />

        </View>
    );
};

export default ListShopScreen;

const styles = StyleSheet.create({
    container: {
        paddingBottom: 124
    },
    Appbar: {
        backgroundColor: "#fff",
        top: 0,
        height: 50,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    search: {
        backgroundColor: '#edf0f0',
        width: '75%',
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: -10,
        borderColor: '#525252'
    },
    editText: {
        paddingHorizontal: 10
    },
    title: {
        fontSize: 18
    },
    category: {
        paddingVertical: 10
    },

});
