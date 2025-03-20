import React from 'react';

function Header() {
    return (
        // <header className="head">
        //     <div className="logo">
        //         <img src="./img/icons/logo-dark.svg" alt="Логотип"/>
        //     </div>
        //     <div className="user-info">
        //         <img src="./img/marketplace-logo/avito-logo.png" alt="Аватар пользователя"/>
        //         <div className="user-details">
        //             <span className="name font-bold uppercase">Артём</span>
        //             <span className="id font-normal">ID: 741342267</span>
        //         </div>
        //     </div>
        // </header>
        <header className="flex relative bg-[#242424] rounded-[15px] justify-between px-[20px] py-[5px] m-[20px] w-auto items-center z-[100] ">
            <img src="./img/icons/logo-dark.svg" alt="Логотип" />
            <div className="flex g-[10px] items-center">
                <img src="./img/user-avatar.png" alt="Аватар пользователя" className="rounded-full w-[24px]" />
                <div className="flex flex-col gap-[2px]">
                    <span className="text-[0.6em] text-white font-bold uppercase">Артём</span>
                    <span className="text-[0.5em] text-white font-normal">ID: 741342267</span>
                </div>
            </div>
        </header>
    )
}

export default Header;