import React from 'react';
import UserInfo from "./UserInfo";

function Header() {
    return (
        <header className="flex relative bg-[#242424] rounded-[15px] justify-between px-[20px] py-[5px] w-full items-center z-[100]">
            <img src="./img/icons/logo-dark.svg" alt="Логотип" />
            <div className="flex gap-2 items-center">
                <img src="./img/user-avatar.png" alt="Аватар пользователя" className="rounded-full w-[32px]" />
                <UserInfo name="Артем" id="123123123" />
            </div>
        </header>
    )
}

export default Header;