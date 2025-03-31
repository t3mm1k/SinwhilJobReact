// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import mapDataReducer from './slices/mapDataSlice';
import uiReducer from './slices/uiSlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        mapData: mapDataReducer,
        ui: uiReducer,
        search: searchReducer
    },
});

export default store;