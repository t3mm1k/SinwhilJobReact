import React from "react";

export default function UserInfo(props) {
    return (
        <div className="flex flex-col">
            <span className="text-[0.6rem] text-white font-bold uppercase">{props.name}</span>
            <span className="text-[0.5rem] text-white font-normal">ID: {props.id}</span>
        </div>
    )
}