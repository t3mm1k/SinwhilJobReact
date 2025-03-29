import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMapData = createAsyncThunk(
    'mapData/fetchMapData',
    async (_, { signal }) => {
        const controller = new AbortController();
        signal.addEventListener('abort', () => controller.abort());

        try {
            const response = await fetch('data_db.json', { signal: controller.signal });
            const data = await response.json();
            return data;
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
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
    filteredData: [],
    clusterData: [],
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
        },
        setMarketplacesFilter: (state, action) => {
            state.filters.marketplaces = action.payload;
        },
        setCityFilter: (state, action) => {
            state.filters.city = action.payload;
        },
        setPositionFilter: (state, action) => {
            state.filters.position = action.payload;
        },
        filterData: (state) => {
            state.filteredData = [];
            if (!state.data) return;

            for (const vacancy of state.data) {
                let matchesFilter = true;

                const vacancyType = vacancy.vacancy_type.toLowerCase();

                // Преобразование city в строку
                const vacancyCity = String(vacancy.address.city).toLowerCase(); // Преобразование и приведение к нижнему регистру
                const filterCity = String(state.filters.city).toLowerCase(); // Преобразование фильтра в нижний регистр

                if (state.filters.vacancy_type !== "" && vacancyType !== state.filters.vacancy_type) {
                    matchesFilter = false;
                    continue;
                }

                if (state.filters.vacancy_type === "part-time" && state.filters.time !== "") { // Добавлена проверка на наличие vacancy.dates
                    if (!((state.filters.time === "1-day") && (vacancy.dates.length === 1))) {
                        if (!((state.filters.time === "1-week") && (vacancy.dates.length < 7))) {
                            if (!((state.filters.time === "1-month") && (vacancy.dates.length < 31))) {
                                if (!((state.filters.time === "more-1-month") && (vacancy.dates.length > 31))) {
                                    matchesFilter = false;
                                    continue;
                                }
                            }
                        }
                    }
                }
                if (state.filters.marketplaces.length > 0 && !state.filters.marketplaces.includes(vacancy?.marketplace)) {
                    matchesFilter = false;
                    continue;
                }
                if (state.filters.city !== "" && vacancyCity !== filterCity) {
                    matchesFilter = false;
                    continue;
                }
                if (state.filters.position !== "" && vacancy?.position !== state.filters.position) {
                    matchesFilter = false;
                    continue;
                }

                if (matchesFilter) {
                    state.filteredData.push(vacancy);
                }
            }
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
            state.filteredData = [];
        },
        setClusterData: (state, action) => {
            state.clusterData = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMapData.fulfilled, (state, action) => {
            if (action.payload) {
                state.data = action.payload;
                mapDataSlice.caseReducers.filterData(state);
            }
        });
        builder.addCase(fetchMapData.pending, (state) => {
            // state.loading = true;
        });
        builder.addCase(fetchMapData.rejected, (state, action) => {
            if (action.error.name !== 'AbortError') {
                // state.loading = false;
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
    resetFilters,
    setClusterData,
} = mapDataSlice.actions;

export default mapDataSlice.reducer;