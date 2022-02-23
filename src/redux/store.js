import { configureStore } from '@reduxjs/toolkit';
import appointnentReducer from './appointnentSlice';
import locationReducer from './locationSlice';
import NotiReducer from './NotiSlice';
import shopReducer from './shopSlice';
import userReducer from './userSlice';

const rootReducer = {
    user: userReducer,
    location: locationReducer,
    repairShop: shopReducer,
    appointnent: appointnentReducer,
    Noti: NotiReducer
}
const store = configureStore({
    reducer: rootReducer
})


export default store;