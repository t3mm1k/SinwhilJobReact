// Vacancy.jsx
import React, {useState} from "react";
import Header from "../Components/Profile/Header/Header";
import Option from "../Components/Profile/Option/Option";
import Marketplace from "../Components/Vacancy/Marketplace/Marketplace";
import OptionsForm from "../Components/Profile/OptionsForm/OptionsForm";
import AccountSwitcher from "../Components/Profile/AccountSwitcher/AccountSwitcher";
import UserInfo from "../Components/Profile/UserInfo/UserInfo";
import Policy from "../Components/Profile/Policy/Policy";
import CompanySelector from "../Components/Profile/CompanySelector/CompanySelector";
import BluredScreen from "../Components/Profile/BluredScreen/BluredScreen";

export default function () {
    const [isShowCompanySelector, toggleIsShowCompanySelector] = useState(true);
    return (
        <div className="w-full px-[15px] overflow-auto flex flex-col gap-4 font-bold py-[20px] text-[0.8rem] relative min-h-screen">
            <BluredScreen />
            <Header />
            <UserInfo />
            <AccountSwitcher />
            <OptionsForm/>
            <Policy />
            <CompanySelector
                isShow={isShowCompanySelector}
            />

        </div>
    )
}