// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import mapDataReducer from './slices/mapDataSlice';
import uiReducer from './slices/uiSlice';
import searchReducer from './slices/searchSlice';
import companyReducer from './slices/companySlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        mapData: mapDataReducer,
        ui: uiReducer,
        search: searchReducer,
        company: companyReducer
    },
});

export default store;