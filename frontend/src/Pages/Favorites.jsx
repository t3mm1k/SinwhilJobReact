import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from "react-redux";
import {setSelectedVacancy, toggleFavoriteVacancy} from "../store/slices/userSlice";
import Header from "../Components/Favorites/Header/Header";
import VacancyItem from "../Components/Favorites/Vacancy/VacancyItem";


const FavoritesComponent = ({ vacancies, favoriteVacancies, setSelectedVacancy, toggleFavoriteVacancy}) => {
    const [expandedVacancyId, setExpandedVacancyId] = useState(null);
    const [mocksVacancies, setMocksVacancies] = useState([]);

    useEffect(() => {
        setMocksVacancies(vacancies.filter(vacancy => favoriteVacancies.includes(vacancy._id)));
    }, [vacancies, favoriteVacancies]);

    if (mocksVacancies.length === 0) {
        return (
            <div className="bg-[var(--first-background-color)] min-h-screen text-white py-5 px-4 flex flex-col">
                <Header />
                <div className="flex-grow flex items-center justify-center">
                    <h1 className="text-center font-bold">Добавьте вакансии в избранное</h1>
                </div>
            </div>
        )
    };

    const toggleVacancyDetails = (id) => {
        setExpandedVacancyId(expandedVacancyId === id ? null : id);
    };

    const removeAllFavorites = () => {
        // Iterate over the *favorite* vacancies.
        for (const vacancyId of favoriteVacancies) {
            toggleFavoriteVacancy(vacancyId); // Dispatch toggle for each ID.
        }
    };

    return (
        <div className="bg-[var(--first-background-color)] min-h-screen text-white py-5 px-4">
            <Header />
            {mocksVacancies.map((vacancy) => (
                <VacancyItem
                    key={vacancy._id}
                    vacancy={vacancy}
                    expanded={expandedVacancyId === vacancy._id}
                    onToggle={() => toggleVacancyDetails(vacancy._id)}
                    setSelectedVacancy={setSelectedVacancy}
                    toggleFavoriteVacancy={toggleFavoriteVacancy}
                />
            ))}
            <button className="text-red-500 mt-5 fixed bottom-3 w-screen mx-[-16px]" onClick={removeAllFavorites}>Очистить избранное</button>
        </div>
    );
};

const mapStateToProps = (state) => ({
    vacancies: state.mapData.data,
    favoriteVacancies: state.user.favorites
});

const mapDispatchToProps = (dispatch) => ({
    setSelectedVacancy: (vacancy) => dispatch(setSelectedVacancy(vacancy)),
    toggleFavoriteVacancy: (id) => dispatch(toggleFavoriteVacancy(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesComponent);