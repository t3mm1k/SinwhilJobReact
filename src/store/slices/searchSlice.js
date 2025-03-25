import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    searchPrompts: [],
    searchValue: '',
    searchResult: null,
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        updateSearchPrompts(state, action) {
            state.searchPrompts = action.payload;
        },
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        setSearchResult(state, action) {
            state.searchResult = action.payload;
            console.log('searchResult: ', state.searchResult);
        },
    },
});

export const { updateSearchPrompts, setSearchValue, setSearchResult } = searchSlice.actions;
export default searchSlice.reducer;