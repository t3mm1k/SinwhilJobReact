// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import mapDataReducer from './slices/mapDataSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        mapData: mapDataReducer,
        ui: uiReducer,
    },
});

export default store;