import React from 'react';

function Footer() {
    return (
        <footer className="footer block w-full">
            <div className="flex relative z-100 px-[20px] py-[10px] rounded-t-none rounded-b-[15px] bg-[#242424] justify-between">
                <div className="footer-button flex flex-col items-center font-bold uppercase p-x-[10px] gap-[2px] text-[8px]">
                    <img src="./img/icons/search.svg" alt="Поиск"/>
                    <span>Поиск</span>
                </div>
                <div className="footer-button flex items-center font-bold uppercase p-x-[10px] gap-[10px] text-[8px] border-solid border border-white rounded-[10px] px-[10px] py-[5px[">
                    <img src="./img/icons/filter_big.svg" alt="Фильтр"/>
                    <span>Фильтры</span>
                </div>
                <div className="footer-button flex flex-col items-center font-bold uppercase p-x-[10px] gap-[2px] text-[8px]">
                    <img src="./img/icons/user_circle.svg" alt="Профиль"/>
                    <span>Профиль</span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;