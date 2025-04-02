import {useNavigate} from "react-router-dom";
import React from "react";

const VacancyDetails = ({ vacancy, setSelectedVacancy, toggleFavoriteVacancy }) => {
    const navigate = useNavigate();

    const onMoreDetails = () => {
        setSelectedVacancy(vacancy);
        navigate('/vacancy');
    };

    const onRemoveFromFavorites = () => {
        toggleFavoriteVacancy(vacancy._id); // Pass the vacancy ID
    }

    return (
        <div className="p-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="flex flex-col items-left">
                    <p className="text-white opacity-50 text-xs uppercase font-semibold">Тип занятости</p>
                    <p className="text-white text-s font-semibold">{vacancy.vacancy_type === "part-time" ? "Подработка" : "Постоянная работа"}</p>
                </div>
                <div className="flex flex-col items-left">
                    <p className="text-white opacity-50 text-xs uppercase font-semibold">Должность</p>
                    <p className="text-white text-s font-semibold">{vacancy.position || 'Не указано'}</p>
                </div>
            </div>
            <div className="flex flex-col items-left">
                <p className="text-white opacity-50 text-xs uppercase font-semibold">Место работы</p>
                <p className="text-white text-s font-semibold">
                    {vacancy.address.city}
                    {vacancy.address.latitude && vacancy.address.longitude
                        ? ` ${vacancy.address.latitude.toFixed(2)}, ${vacancy.address.longitude.toFixed(2)}`
                        : ''}
                </p>
            </div>
            <div className="flex gap-2 mt-2">
                <button
                    className="bg-transparent border-2 border-white text-white py-2 px-4 rounded-xl flex items-center gap-2 w-1/2 justify-center"
                    onClick={onRemoveFromFavorites}
                >
                    <img src="./img/icons/heart.svg" alt="Remove" className="w-5 h-5" />
                    Удалить
                </button>
                <button className="bg-white text-black py-2 px-4 rounded-xl w-1/2 text-center" onClick={onMoreDetails}>
                    Подробнее
                </button>
            </div>
        </div>
    );
};

export default VacancyDetails;