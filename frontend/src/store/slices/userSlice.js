import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Артем',
    id: '123123123',
    selectedVacancy: {}
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
    },
});

export const { updateUser, setSelectedVacancy } = userSlice.actions;
export default userSlice.reducer;