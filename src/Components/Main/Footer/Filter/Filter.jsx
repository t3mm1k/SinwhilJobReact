import React, { useEffect } from 'react';
import './Filter.css';
import { connect } from 'react-redux';
import {
    setVacancyTypeFilter,
    setTimeFilter,
    setMarketplacesFilter,
    setCityFilter,
    setPositionFilter,
    filterData,
    resetFilters,
    fetchMapData,

} from '../../../../store/slices/mapDataSlice';
import CityFilter from './FilterComponents/CityFilter';
import PositionFilter from './FilterComponents/PositionFilter';
import TimeFilter from "./FilterComponents/TimeFilter";
import VacancyTypeFilter from "./FilterComponents/VacancyTypeFilter";
import MarketplacesFilter from "./FilterComponents/MarketplacesFilter";

function FilterComponent({
                             data,
                             filters,
                             isFilterOpen,
                             setVacancyTypeFilter,
                             setTimeFilter,
                             setMarketplacesFilter,
                             setCityFilter,
                             setPositionFilter,
                             filterData,
                             resetFilters,
                             fetchMapData,
                             closeFilters
                         }) {

    const uniqueCities = [...new Set(data.map(item => item?.city).filter(Boolean))];
    const uniquePositions = [...new Set(data.map(item => item?.position).filter(Boolean))];

    useEffect(() => {
        fetchMapData();
    }, [fetchMapData]);

    const handleVacancyTypeChange = (newValue) => {
        setVacancyTypeFilter(newValue);
        if (newValue === 'full-time') {
            setTimeFilter('');
        }
        filterData();
    };

    const handleTimeChange = (newValue) => {
        setTimeFilter(newValue);
        filterData();
    };

    const handleCityChange = (event) => {
        setCityFilter(event.target.value);
        filterData();
    };

    const handlePositionChange = (event) => {
        setPositionFilter(event.target.value);
        filterData();
    };

    const handleMarketplaceChange = (event) => {
        const selectedMarketplace = event.currentTarget.value;
        const isAlreadySelected = filters.marketplaces.includes(selectedMarketplace);

        let updatedMarketplaces;
        if (isAlreadySelected) {
            updatedMarketplaces = filters.marketplaces.filter(mp => mp !== selectedMarketplace);
        } else {
            updatedMarketplaces = [...filters.marketplaces, selectedMarketplace];
        }

        setMarketplacesFilter(updatedMarketplaces);
        filterData();
    };

    return (
        <div className={`filters-container ${!isFilterOpen ? 'collapsed' : ''}`} >
            <div className='filters-content' >
                <VacancyTypeFilter selectedVacancyType={filters.vacancy_type} onChange={handleVacancyTypeChange} />

                {filters.vacancy_type !== "full-time" && (
                    <TimeFilter selectedTime={filters.time} onChange={handleTimeChange} />
                )}

                <MarketplacesFilter selectedMarketplaces={filters.marketplaces} onChange={handleMarketplaceChange} />

                <span className="separator block opacity-[10%] h-px border-[white] border-[solid] border"></span>

                <CityFilter cities={uniqueCities} selectedCity={filters.city} onChange={handleCityChange} />

                <span className="separator block opacity-[10%] h-px border-[white] border-[solid] border"></span>

                <PositionFilter positions={uniquePositions} selectedPosition={filters.position} onChange={handlePositionChange} />

            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    filters: state.mapData.filters,
    data: state.mapData.data,
    isFilterOpen: state.ui.isFilterOpen, // Получаем isFilterOpen
});

const mapDispatchToProps = {
    setVacancyTypeFilter,
    setTimeFilter,
    setMarketplacesFilter,
    setCityFilter,
    setPositionFilter,
    filterData,
    resetFilters,
    fetchMapData

};

const Filter = connect(mapStateToProps, mapDispatchToProps)(FilterComponent);

export default Filter;