import React from "react";
import VacancyHeader from "./VacancyHeader";
import VacancyDetails from "./VacancyDetails";

const VacancyItem = ({ vacancy, expanded, onToggle, setSelectedVacancy, toggleFavoriteVacancy }) => {
    return (
        <div className="bg-[var(--second-background-color)] rounded-[10px] mb-4 overflow-hidden">
            <VacancyHeader vacancy={vacancy} expanded={expanded} onToggle={onToggle} />
            {expanded && <VacancyDetails vacancy={vacancy} setSelectedVacancy={setSelectedVacancy} toggleFavoriteVacancy={toggleFavoriteVacancy}/>}
        </div>
    );
};

export default VacancyItem;