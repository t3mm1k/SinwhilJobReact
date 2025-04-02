import React from "react";
import {useSelector} from "react-redux";

function UserInfo() {
    const store = useSelector((state) => state);

    return (
        <div className="flex gap-2 items-center px-2 py-2 bg-[var(--second-background-color)] rounded-[10px] relative z-0">
            <img src={store.user.avatar} alt="Аватар пользователя" className="rounded-full w-[32px]" />

            <div className="flex flex-col">
                <span className="text-[0.6rem] text-white font-bold uppercase">{store.user.name}</span>
                <span className="text-[0.5rem] text-white font-normal">ID: {store.user.id}</span>
            </div>
        </div>
    )
}

export default UserInfo;