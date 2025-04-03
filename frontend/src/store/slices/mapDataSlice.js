import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMapData = createAsyncThunk(
    'mapData/fetchMapData',
    async (_, { signal }) => { // No filters argument
        const controller = new AbortController();
        signal.addEventListener('abort', () => controller.abort());

        try {
            const response = await fetch("/api/vacancies", { signal: controller.signal });  // Simple GET request

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

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
    loading: false, // Add loading state
    error: null      // Add error state
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
        filterData: (state) => { // Reactivate
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
        builder
            .addCase(fetchMapData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMapData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
                state.filteredData = action.payload; // Backend already filters
                mapDataSlice.caseReducers.filterData(state); // Apply filtering
            })
            .addCase(fetchMapData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
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

// Export selectors for loading and error states
export const selectMapDataLoading = (state) => state.mapData.loading;
export const selectMapDataError = (state) => state.mapData.error;

export default mapDataSlice.reducer;