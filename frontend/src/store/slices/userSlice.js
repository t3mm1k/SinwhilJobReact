import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Артем',
    id: '123123123',
    avatar: './img/user-avatar.png',
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
        },
        updateUserResume: (state, action) => {
            state.resume = action.payload;
        },
        toggleFavoriteVacancy: (state, action) => {
            console.log(1)
            const vacancyId = action.payload;
            if (state.favorites.includes(vacancyId)) {
                state.favorites = state.favorites.filter(id => id !== vacancyId);
            } else {
                state.favorites.push(vacancyId);
            }
        }
    },
});

export const { updateUserResume, setSelectedVacancy, toggleFavoriteVacancy} = userSlice.actions;
export default userSlice.reducer;