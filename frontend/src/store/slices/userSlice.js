import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Артем',
    id: '123123123',
    selectedVacancy: {},
    balance: 0,
    favorites: [],
    resume: {
        first_name: "",
        last_name: "",
        phone: "",
        experience: "",
        desired_salary: "",
        additional_info: ""
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            // Обновление информации о пользователе
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        setSelectedVacancy: (state, action) => {
            state.selectedVacancy = action.payload;
            console.log(state.selectedVacancy);
        },
        updateUserResume: (state, action) => {
            state.resume = action.payload;
            console.log(state.resume);
        },
    },
});

export const { updateUserResume, setSelectedVacancy } = userSlice.actions;
export default userSlice.reducer;