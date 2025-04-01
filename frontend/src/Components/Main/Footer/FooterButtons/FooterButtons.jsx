// FooterButtons.js
import React from 'react';
import { connect } from 'react-redux';
import { toggleFilterVisibility, toggleSearchVisibility } from '../../../../store/slices/uiSlice';
import { useNavigate } from 'react-router-dom';

function FooterButtonsComponent({ toggleFilterVisibility, toggleSearchVisibility }) {
    const navigate = useNavigate();
    return (
        <div className={`flex px-[20px] z-[200] py-[10px] bg-[#242424] justify-between mt-0`}>
            <button
                className="footer-button flex flex-col items-center font-bold uppercase px-[10px] gap-[2px] text-[8px]"
                onClick={ () => {toggleSearchVisibility()} }
                type="button"
            >
                <img src="./img/icons/search.svg" alt="Поиск" />
                <span>Поиск</span>
            </button>
            <button
                className="footer-button flex items-center font-bold uppercase px-[10px] gap-[10px] text-[8px] border-solid border border-white rounded-[10px] px-[10px] py-[5px]"
                onClick={ () => {toggleFilterVisibility()} }
                type="button"
            >
                <img src="./img/icons/filter_big.svg" alt="Фильтр" />
                <span>Фильтры</span>
            </button>
            <button className="footer-button flex flex-col items-center font-bold uppercase px-[10px] gap-[2px] text-[8px]" onClick={() => navigate('/profile')}>
                <img src="./img/icons/user_circle.svg" alt="Профиль" />
                <span>Профиль</span>
            </button>
        </div>
    );
}


const mapDispatchToProps = {
    toggleFilterVisibility,
    toggleSearchVisibility
};

const FooterButtons = connect(null, mapDispatchToProps)(FooterButtonsComponent);

export default FooterButtons;