import React from 'react';
import { connect } from 'react-redux';
import Search from "./Search/Search";
import FooterButtons from "./FooterButtons/FooterButtons";
import ClusterSelection from "./ClusterSelection/ClusterSelection";
import Filter from "./Filter/Filter";

function FooterComponent({ isFilterOpen, isClusterSelectionOpen }) {
    return (
        <footer className="block relative rounded-[15px] m-[25px] w-auto overflow-hidden bg-[#242424]">
            <Filter />
            <div className="flex flex-col w-full">
                <ClusterSelection />
                <Search />
                <FooterButtons />
            </div>
        </footer>
    );
}

const mapStateToProps = (state) => ({
    isFilterOpen: state.ui.isFilterOpen,
    isClusterSelectionOpen: state.ui.isClusterSelectionOpen,
});

export default connect(mapStateToProps)(FooterComponent);