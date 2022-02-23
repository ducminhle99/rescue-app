import { createSlice } from '@reduxjs/toolkit';

const appointnent = createSlice({
    name: 'appointnent',
    initialState: [],
    reducers: {
        setAppointnent: (state, action) => {
            return action.payload
        }
    }
});

const { reducer, actions } = appointnent;
export const { setAppointnent } = actions;
export default reducer;