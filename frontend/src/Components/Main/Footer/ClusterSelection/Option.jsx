// Option.jsx
import react from 'react';
import './Option.css';
import { useNavigate } from 'react-router-dom';

function Option({vacancy, setSelectedVacancy, setIsClusterSelectionOpen}) {
    const navigate = useNavigate();
    let logoSrc = '';
    switch (vacancy.marketplace) {
        case 'Wildberries': logoSrc = './img/marketplace-logo/Wildberries.png'; break;
        case 'Yandex': logoSrc = './img/marketplace-logo/Yandex.png'; break;
        case 'Ozon': logoSrc = './img/marketplace-logo/Ozon.png'; break;
        case 'Avito': logoSrc = './img/marketplace-logo/Avito.png'; break;
        case 'Boxberry': logoSrc = './img/marketplace-logo/Boxberry.png'; break;
        default: logoSrc = './img/icons/logo-dark.svg';
    }

    let salaryText = vacancy.vacancy_type === "part-time" ? " / за смену" : " / в месяц";

    const handleClick = () => {
        setIsClusterSelectionOpen(false);
        setSelectedVacancy(vacancy); // Dispatch action to set selectedVacancy in Redux
        navigate('/vacancy'); // Navigate to the Vacancy page
    };


    return (
        <button className="option flex gap-[15px] py-[10px] items-center" onClick={handleClick}>
            <img className="w-[40px] rounded-full" src={logoSrc}/>
            <div className="flex flex-col gap-[2px] text-left text-sm">
                <p className="font-bold">{vacancy.position}</p>
                <p className="text-[0.7em]">{vacancy.salary} {salaryText}</p>
            </div>
        </button>
    )
}

export default Option;