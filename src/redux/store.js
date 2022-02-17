import { configureStore, applyMiddleware, compose } from '@reduxjs/toolkit';
import locationReducer from './locationSlice';
import userReducer from './userSlice';
import shopReducer from './shopSlice';

const rootReducer = {
    user: userReducer,
    location: locationReducer,
    repairShop: shopReducer
}
const store = configureStore({
    reducer: rootReducer
})


export default store;