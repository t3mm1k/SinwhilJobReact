    import Header from "../Header/Header";
import Marketplace from "../Marketplace/Marketplace";
import InfoLabel from "../InfoLabel/InfoLabel";
import Calendar from "../Calendar/Calendar";
import React from "react";
import { useSelector } from "react-redux";

function VacancyForm({}) {
    const selectedVacancy = useSelector(state => state.user.selectedVacancy);
    if (!selectedVacancy) {
        return <p>Выберите вакансию</p>;
    }

    const isFullTime = selectedVacancy.vacancy_type === "full-time";
    const highlightedDates = selectedVacancy.dates;

    return (
        <div className="flex flex-col gap-[20px]">
            <Header />
            <Marketplace marketplace={selectedVacancy.marketplace} />
            <InfoLabel label="Место работы" text={`${selectedVacancy.address.city}, ${selectedVacancy.address.latitude}, ${selectedVacancy.address.longitude}`} />
            <InfoLabel label="Тип работы" text={isFullTime ? "Полная занятость" : "Частичная занятость"} />
            <InfoLabel label="Заработная плата" text={`${selectedVacancy.salary}`} />
            <InfoLabel label="Должность" text={selectedVacancy.position} />

            {isFullTime ? (
                <>
                    <InfoLabel label="График работы" text={selectedVacancy.schedule} />
                </>
            ) : (
                <>
                    <Calendar highlightedDates={highlightedDates} />
                </>
            )}
            <InfoLabel label="Выплаты" text={selectedVacancy.payment} />
            {selectedVacancy.scope != "" ? <InfoLabel label="Примерный объем" text={selectedVacancy.scope} /> : null}
            {selectedVacancy.extras != "" ? <InfoLabel label="Какие допы подключены" text={selectedVacancy.extras} /> : null}
            {selectedVacancy.experience != "" ? <InfoLabel label="Наличие опыта у сотрудника" text={selectedVacancy.experience} /> : null}
            {selectedVacancy.additionalInfo != "" ? <InfoLabel label="Дополнительная информация" text={selectedVacancy.additionalInfo} /> : null}
        </div>
    );
}

export default VacancyForm;