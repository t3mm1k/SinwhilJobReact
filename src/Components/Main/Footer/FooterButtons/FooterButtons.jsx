// FooterButtons.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterVisibility, toggleSearchVisibility } from '../../../../store/slices/uiSlice';

function FooterButtonsComponent({ toggleFilterVisibility, toggleSearchVisibility }) {
    return (
        <div className={`flex px-[20px] z-[200] py-[10px] bg-[#242424] justify-between mt-0`}>
            <div
                className="footer-button flex flex-col items-center font-bold uppercase p-x-[10px] gap-[2px] text-[8px]"
                onClick={ () => {toggleSearchVisibility()} }
                type="button"
            >
                <img src="./img/icons/search.svg" alt="Поиск" />
                <span>Поиск</span>
            </div>
            <button
                className="footer-button flex items-center font-bold uppercase p-x-[10px] gap-[10px] text-[8px] border-solid border border-white rounded-[10px] px-[10px] py-[5px]"
                onClick={ () => {toggleFilterVisibility()} }
                type="button"
            >
                <img src="./img/icons/filter_big.svg" alt="Фильтр" />
                <span>Фильтры</span>
            </button>
            <div className="footer-button flex flex-col items-center font-bold uppercase p-x-[10px] gap-[2px] text-[8px]">
                <img src="./img/icons/user_circle.svg" alt="Профиль" />
                <span>Профиль</span>
            </div>
        </div>
    );
}


const mapDispatchToProps = {
    toggleFilterVisibility,
    toggleSearchVisibility
};

const FooterButtons = connect(null, mapDispatchToProps)(FooterButtonsComponent);

export default FooterButtons;