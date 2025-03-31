// Vacancy.jsx
import React from "react";
import Header from "../Components/Profile/Header/Header";
import Option from "../Components/Profile/Option/Option";
import Marketplace from "../Components/Vacancy/Marketplace/Marketplace";
import OptionsForm from "../Components/Profile/OptionsForm/OptionsForm";

export default function () {
    return (
        <div className="w-full p-[15px] overflow-auto flex flex-col gap-3">
            <Header />
            <OptionsForm/>
        </div>
    )
}