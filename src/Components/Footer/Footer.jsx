
import React from 'react';
import { connect } from 'react-redux';
import Filter from "./Filter/Filter";
import FooterButtons from "./FooterButtons/FooterButtons";
import Search from "./Search/Search";
import { toggleFilterVisibility } from '../../store/slices/uiSlice';

function FooterComponent({ isFilterOpen, closeFilters }) {
    return (
        <footer className="block relative rounded-[15px] m-[20px] w-auto overflow-hidden">
            <Filter/>
            <div className="flex flex-col w-full">
                <Search />
                <FooterButtons />
            </div>
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