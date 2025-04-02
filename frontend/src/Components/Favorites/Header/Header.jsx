import {useNavigate} from "react-router-dom";
import React from "react";

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="relative flex items-center mb-5">
            <button
                className="flex items-center gap-2 text-[0.8rem]"
                onClick={() => navigate(-1)}
            >
                <img src="/img/icons/arrow-left.svg" alt="Back" className="w-4 h-4" />
                Назад
            </button>
            <h1 className="text-[1rem] font-semibold ml-auto mr-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Избранное</h1>
        </header>
    );
};

export default Header;