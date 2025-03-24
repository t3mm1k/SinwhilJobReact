
import React from 'react';
import { connect } from 'react-redux';
import Filter from "./Filter/Filter";
import FooterButtons from "./FooterButtons/FooterButtons";
import Search from "./Search/Search";
import { toggleFilterVisibility } from '../../store/slices/uiSlice';

function FooterComponent({ isFilterOpen, closeFilters }) {
    return (
        <footer className="block relative z-[100] rounded-[15px] m-[20px] w-auto overflow-hidden">
            <Filter isFilterOpen={closeFilters} />
            <FooterButtons />
        </footer>
    );
}

const mapStateToProps = (state) => ({
    isFilterOpen: state.ui.isFilterOpen,
});

const mapDispatchToProps = {
    toggleFilterVisibility,
};

const Footer = connect(mapStateToProps, mapDispatchToProps)(FooterComponent);

export default Footer;