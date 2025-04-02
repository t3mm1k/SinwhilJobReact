import {useNavigate} from "react-router-dom";
import React from "react";

function Header() {
    const navigate = useNavigate();

    return (
        <header className="relative flex items-center z-0">
            <button
                className="flex items-center gap-2 text-[0.8rem] font-normal"
                onClick={() => navigate(-1)}
            >
                <img src="/img/icons/arrow-left.svg" alt="Back" className="w-4 h-4" />
                Назад
            </button>
            <h1 className="text-[1rem] font-semibold ml-auto mr-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Профиль</h1>
        </header>
    );

    // return (
    //     <div className="flex justify-between   h-auto">
    //         <button className="flex items-center justify-center gap-[5px] text-[0.8rem]" onClick={() => navigate('/')}>
    //             <img src="./img/icons/arrow-left.svg" alt="Назад" />
    //             Назад
    //         </button>
    //         <p>ООО ООООООО</p>
    //         <img src="./img/icons/like.svg" alt="Назад" />
    //     </div>
    // );
}

export default Header;