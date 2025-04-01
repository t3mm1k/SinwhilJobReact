// Vacancy.jsx
import React from "react";
import Header from "../Components/Profile/Header/Header";
import Option from "../Components/Profile/Option/Option";
import Marketplace from "../Components/Vacancy/Marketplace/Marketplace";
import OptionsForm from "../Components/Profile/OptionsForm/OptionsForm";
import AccountSwitcher from "../Components/Profile/AccountSwitcher/AccountSwitcher";
import UserInfo from "../Components/Profile/UserInfo/UserInfo";
import Policy from "../Components/Profile/Policy/Policy";

export default function () {
    return (
        <div className="w-full px-[15px] overflow-auto flex flex-col gap-4 font-bold py-[20px] text-[0.8rem]">
            <Header />
            <UserInfo />
            <AccountSwitcher />
            <OptionsForm/>
            <Policy />
        </div>
    )
}