import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'Артем',
    id: '123123123'
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
    },
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;