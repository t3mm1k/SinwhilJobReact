
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    isFilterOpen: false,
    isSearchOpen: false,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setFilterVisibility: (state, action) => {
            state.isFilterOpen = action.payload;
        },
        setSearchVisibility: (state, action) => {
            state.isSearchOpen = action.payload;
        },
    },
});

export const { setFilterVisibility, setSearchVisibility } = uiSlice.actions;
export default uiSlice.reducer;

export const toggleFilterVisibility = createAsyncThunk(
    'ui/toggleFilterVisibility',
    async (_, { getState, dispatch }) => {
        const { isSearchOpen, isFilterOpen } = getState().ui;

        if (isSearchOpen) {
            dispatch(setSearchVisibility(false));
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        dispatch(setFilterVisibility(!isFilterOpen));
    }
);

export const toggleSearchVisibility = createAsyncThunk(
    'ui/toggleSearchVisibility',
    async (_, { getState, dispatch }) => {
        const { isSearchOpen, isFilterOpen } = getState().ui;

        if (isFilterOpen) {
            dispatch(setFilterVisibility(false));
            await new Promise(resolve => setTimeout(resolve, 500));
        }
        dispatch(setSearchVisibility(!isSearchOpen));
    }
);