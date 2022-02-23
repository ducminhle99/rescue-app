import { createSlice } from '@reduxjs/toolkit';

const noti = createSlice({
    name: 'Noti',
    initialState: 1,
    reducers: {
        setNoti: (state, action) => {
            const newState = state + 1
            return newState
        },
    }
});

const { reducer, actions } = noti;
export const { setNoti } = actions;
export default reducer;