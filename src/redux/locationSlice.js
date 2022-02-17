import { createSlice } from '@reduxjs/toolkit';
const initLocation = null;

const location = createSlice({
    name: 'location',
    initialState: initLocation,
    reducers: {
        setLocation: (state, action) => {
            const location = action.payload;
            return location;
        }
    }
});

const { reducer, actions } = location;
export const { setLocation } = actions;
export default reducer;