import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { toggleFavoriteVacancy } from "../../../store/slices/userSlice";

function HeaderComponent({ vacancy, toggleFavoriteVacancy, favoritesVacancies }) {
    const navigate = useNavigate();

    const isFavoriteVacancy = (vacancy) => {
        if (!vacancy) return false; // Handle case where vacancy is null/undefined
        return favoritesVacancies.includes(vacancy._id); // Correct check
    };

    return (
        <div className="flex justify-between items-center h-auto">
            <button className="flex items-center justify-center gap-[5px] text-[0.8rem]" onClick={() => navigate(-1)}>
                <img src="./img/icons/arrow-left.svg" alt="Назад" />
                Назад
            </button>
            <p>ООО ООООООО</p>
            <svg
                width="22"
                height="19"
                viewBox="0 0 22 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    if (vacancy) {
                        toggleFavoriteVacancy(vacancy._id);
                    }
                }}
                style={{ cursor: 'pointer' }}
            >
                <path
                    d="M3.45067 10.5748L10.4033 17.1061C10.6428 17.3311 10.7625 17.4435 10.9037 17.4713C10.9673 17.4837 11.0327 17.4837 11.0963 17.4713C11.2375 17.4435 11.3572 17.3311 11.5967 17.1061L18.5493 10.5748C20.5055 8.73722 20.743 5.71322 19.0978 3.59269L18.7885 3.19397C16.8203 0.657206 12.8696 1.08264 11.4867 3.98028C11.2913 4.38959 10.7087 4.38959 10.5133 3.98028C9.13037 1.08264 5.17972 0.65721 3.21154 3.19397L2.90219 3.5927C1.25695 5.71323 1.4945 8.73722 3.45067 10.5748Z"
                    stroke="white"
                    strokeWidth="2"
                    fill={isFavoriteVacancy(vacancy) ? "white" : "none"}
                />
            </svg>
        </div>
    );
}

const mapStateToProps = (state) => ({
    favoritesVacancies: state.user.favorites,
    vacancy: state.user.selectedVacancy
});

const mapDispatchToProps = (dispatch) => ({
    toggleFavoriteVacancy: (vacancyId) => dispatch(toggleFavoriteVacancy(vacancyId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);