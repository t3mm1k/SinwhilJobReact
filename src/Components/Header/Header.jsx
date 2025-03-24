import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
    const store = useSelector((state) => state);

    return (
        <header className="flex relative bg-[#242424] rounded-[15px] justify-between px-[20px] py-[5px] items-center z-[100] m-[20px]">
            <img src="./img/icons/logo-dark.svg" alt="Логотип" />
            <div className="flex gap-2 items-center">
                <img src="./img/user-avatar.png" alt="Аватар пользователя" className="rounded-full w-[32px]" />

                <div className="flex flex-col">
                    <span className="text-[0.6rem] text-white font-bold uppercase">{store.user.name}</span>
                    <span className="text-[0.5rem] text-white font-normal">ID: {store.user.id}</span>
                </div>
            </div>
        </header>
    )
}

export default Header;