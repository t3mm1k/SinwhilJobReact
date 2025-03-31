// Vacancy.jsx
import React from "react";
import Header from "../Components/Vacancy/Header/Header";
import Marketplace from "../Components/Vacancy/Marketplace/Marketplace";
import InfoLabel from "../Components/Vacancy/InfoLabel/InfoLabel";
import Calendar from "../Components/Vacancy/Calendar/Calendar";
import { useSelector } from 'react-redux';
import VacancyForm from "../Components/Vacancy/VacancyForm/VacancyForm"; // Import useSelector

export default function () {
    return (
        <div className="w-full p-[15px] overflow-auto">
            <VacancyForm />
        </div>
    )
}