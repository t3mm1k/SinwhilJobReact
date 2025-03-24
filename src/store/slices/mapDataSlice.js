// mapDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMapData = createAsyncThunk(
    'mapData/fetchMapData',
    async (_, { signal }) => { // Добавляем { signal }
        const controller = new AbortController();
        signal.addEventListener('abort', () => controller.abort());

        try {
            const response = await fetch('data.json', { signal: controller.signal });
            const data = await response.json();
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Fetch aborted');
                return; // Или определенное значение, если нужно
            } else {
                throw error;
            }
        }
    }
);

const initialState = {
    data: [],
    filters: {
        vacancy_type: "",
        time: "",
        marketplaces: [],
        city: "",
        position: ""
    },
    filteredData: []
};
const mapDataSlice = createSlice({
    name: 'mapData',
    initialState,
    reducers: {
        setVacancyTypeFilter: (state, action) => {
            state.filters.vacancy_type = action.payload;
        },
        setTimeFilter: (state, action) => {
            state.filters.time = action.payload;
            console.log(state.filters.time);
        },
        setMarketplacesFilter: (state, action) => {
            state.filters.marketplaces = action.payload;
            console.log(state.filters.marketplaces);
        },
        setCityFilter: (state, action) => {
            state.filters.city = action.payload;
            console.log(state.filters.city);
        },
        setPositionFilter: (state, action) => {
            state.filters.position = action.payload;
        },
        filterData: (state) => {
            state.filteredData = [];

            if (!state.data) {
                return;
            }

            for (const vacancy of state.data) {
                let matchesFilter = true; // Флаг, соответствует ли вакансия всем фильтрам

                // Проверяем vacancy_type
                if (state.filters.vacancy_type !== "") {
                    if (vacancy?.vacancy_type !== state.filters.vacancy_type) {
                        matchesFilter = false;
                        continue;
                    }
                    if (state.filters.vacancy_type === "part-time" && state.filters.time !== "") {
                        if (vacancy?.time !== state.filters.time) {
                            matchesFilter = false;
                            continue;
                        }
                    }
                }


                // Проверяем marketplaces
                if (state.filters.marketplaces.length > 0) {
                    if (!state.filters.marketplaces.includes(vacancy?.marketplace)) {
                        matchesFilter = false;
                        continue;
                    }
                }

                // Проверяем city
                if (state.filters.city !== "") {
                    if (vacancy?.city !== state.filters.city) {
                        matchesFilter = false;
                        continue;
                    }
                }

                // Проверяем position
                if (state.filters.position !== "") {
                    if (vacancy?.position !== state.filters.position) {
                        matchesFilter = false;
                        continue;
                    }
                }

                // Если вакансия соответствует всем примененным фильтрам, добавляем её
                if (matchesFilter) {
                    state.filteredData.push(vacancy);
                }
            }

            console.log("filteredData", state.filteredData);
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.filteredData = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMapData.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
                mapDataSlice.caseReducers.filterData(state);
            }
        });
        builder.addCase(fetchMapData.pending, (state) => {
            // state.loading = true; // Если нужен индикатор загрузки
        });
        builder.addCase(fetchMapData.rejected, (state, action) => {
            if (action.error.name !== 'AbortError') { // Обрабатываем только ошибки, не связанные с отменой
                // state.loading = false;
                // state.error = action.error; // Если нужна обработка ошибок
            }
        });
    },
});

export const {
    setVacancyTypeFilter,
    setTimeFilter,
    setMarketplacesFilter,
    setCityFilter,
    setPositionFilter,
    filterData,
    resetFilters
} = mapDataSlice.actions;

export default mapDataSlice.reducer;