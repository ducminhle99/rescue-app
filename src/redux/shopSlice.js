import { createSlice } from '@reduxjs/toolkit';
import { getDistance } from 'geolib';

const shop = createSlice({
    name: 'repairShop',
    initialState: [],
    reducers: {
        setRepairShop: (state, action) => {

            const { location, list } = action.payload;
            const shopList = list.map((shop) => {
                const dist = getDistance({ latitude: shop.address.latitude, longitude: shop.address.longitude },
                    { latitude: location.coords.latitude, longitude: location.coords.longitude });
                const Distance = { distance: Math.round(dist / 1000 * 10) / 10 };
                return {
                    ...shop, ...Distance
                }
            });
            shopList.sort((a, b) => a.distance - b.distance);
            return shopList;
        }
    }
});

const { reducer, actions } = shop;
export const { setRepairShop } = actions;
export default reducer;