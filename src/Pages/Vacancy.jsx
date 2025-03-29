
import React from "react";
import Header from "../Components/Vacancy/Header/Header";
import Marketplace from "../Components/Vacancy/Marketplace/Marketplace";
import InfoLabel from "../Components/Vacancy/InfoLabel/InfoLabel";
import Calendar from "../Components/Vacancy/Calendar/Calendar";


export default function () {
    const highlightedDates = ["26.03.2025", "15.03.2025", "20.03.2024", "23.03.2024"];
    return (
        <div className="flex flex-col gap-[20px] w-full p-[15px] overflow-auto">
            <Header />
            <Marketplace marketplace="Ozon"/>
            <InfoLabel label="Место работы" text="Россия, Москва, улица Арбат, дом 24"/>
            <InfoLabel label="Ставка за смену" text="5000 Р"/>
            <InfoLabel label="Должность" text="Оператор ПВЗ"/>
            <Calendar highlightedDates={highlightedDates} />
            <InfoLabel label="Выплаты" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit sodales lacus, sit amet gravida est efficitur ac. Fusce vulputate malesuada mi nec."/>
            <InfoLabel label="Примерный объём" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit sodales lacus, sit amet gravida est efficitur ac. Fusce vulputate malesuada mi nec."/>
            <InfoLabel label="Какие допы подключены" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit sodales lacus, sit amet gravida est efficitur ac. Fusce vulputate malesuada mi nec."/>
            <InfoLabel label="Наличие опыта у сотрудника" text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut hendrerit sodales lacus, sit amet gravida est efficitur ac. Fusce vulputate malesuada mi nec."/>
        </div>
    )
}