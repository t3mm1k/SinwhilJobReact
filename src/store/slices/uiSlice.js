
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isFilterOpen: false,
    isSeaching: false
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleFilterVisibility: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        },
        toggleSearchVisibility: (state) => {
            state.isFilterOpen = !state.isFilterOpen;
        }

    },
});

export const { toggleFilterVisibility } = uiSlice.actions;
export default uiSlice.reducer;