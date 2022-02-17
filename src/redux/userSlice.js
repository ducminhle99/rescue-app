import { createSlice } from '@reduxjs/toolkit';
import { deleteLocalAccessToken, setLocalAccessToken } from './localStorage';
const initState = {};

const user = createSlice({
    name: 'user',
    initialState: initState,
    reducers: {
        login: (state, action) => {
            const newState = { ...state, user: action.payload.user }
            setLocalAccessToken({ authToken: action.payload.accessToken });
            return newState;
        },
        logout: (state, action) => {
            deleteLocalAccessToken();
            return state;
        },
        setUser: (state, action) => {

            const newState = { ...state, user: action.payload.user }
            return newState;
        }
    }
});

const { reducer, actions } = user;
export const { login, logout, setUser } = actions;
export default reducer;