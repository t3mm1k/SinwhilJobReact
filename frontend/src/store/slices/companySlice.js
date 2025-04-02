// companySlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userCompanies: [
        {
            creatorId: 1,
            id: "123",
            name: "123"
        },
        {
            creatorId: 1,
            id: "1234",
            name: "1234"
        }
    ],
    allCompanies: [
        {
            creatorId: 1,
            id: "123",
            name: "123"
        },,
        {
            creatorId: 1,
            id: "1234",
            name: "1234"
        },
        {
            creatorId: 2,
            id: "12345",
            name: "12345"
        }
    ],
    selectedCompanyId: null,
    isEditMode: false,
    isShowCompanySelector: false
};

const companySlice = createSlice({
    name: 'company',          // A unique name for this slice
    initialState,             // The initial state of the slice
    reducers: {
        setCompanies: (state, action) => {
            // Replaces the entire company list with the payload
            // (e.g., when loading data from an API)
            state.companies = action.payload;
        },
        setSelectedCompanyId: (state, action) => {
            // Sets the ID of the selected company
            state.selectedCompanyId = action.payload;
        },
        addCompany: (state, action) => {
            // Adds a new company object to the end of the list
            state.companies.push(action.payload);
        },
        deleteCompany: (state, action) => {
            state.companies = state.companies.filter(company => company.id !== action.payload);
            if (state.selectedCompanyId === action.payload) {
                state.selectedCompanyId = null;
            }
        },
        toggleEditMode: (state) => {
            state.isEditMode = !state.isEditMode;
        },
        updateCompany: (state, action) => {
            const updatedCompany = action.payload;
            state.companies = state.companies.map(company =>
                company.id === updatedCompany.id ? updatedCompany : company
            );
        },
        toggleIsShowCompanySelector: (state) => {
            state.isShowCompanySelector = !state.isShowCompanySelector;
            console.log(state.isShowCompanySelector);
        }
    },
});

// Export the action creators (functions that dispatch actions)
export const {
    setCompanies,
    setSelectedCompanyId,
    addCompany,
    deleteCompany,
    toggleEditMode,
    updateCompany,
    toggleIsShowCompanySelector
} = companySlice.actions;

// Export the reducer function (to be added to the Redux store)
export default companySlice.reducer;