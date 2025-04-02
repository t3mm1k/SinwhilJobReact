import React from "react";

const VacancyHeader = ({ vacancy, expanded, onToggle }) => {
    let logoSrc = '';
    switch (vacancy.marketplace) {
        case 'Wildberries': logoSrc = './img/marketplace-logo/Wildberries.png'; break;
        case 'Yandex': logoSrc = './img/marketplace-logo/Yandex.png'; break;
        case 'Ozon': logoSrc = './img/marketplace-logo/Ozon.png'; break;
        case 'Avito': logoSrc = './img/marketplace-logo/Avito.png'; break;
        case 'Boxberry': logoSrc = './img/marketplace-logo/Boxberry.png'; break;
        default: logoSrc = './img/icons/logo-dark.svg';
    }
    return (
        <div
            className="flex items-center justify-between p-3 cursor-pointer mx-2"
            onClick={onToggle}
            style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
            <div className="flex items-center gap-3">
                <img
                    src={logoSrc}
                    alt={vacancy.marketplace}
                    className="w-12 h-12 rounded-full object-cover "
                />
                <div className="">
                    <h2 className="font-bold uppercase text-sm">{vacancy.marketplace}</h2>
                    <p className="text-gray-400 text-sm">{vacancy.salary} ₽</p>
                </div>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${
                    expanded ? 'rotate-180' : ''
                }`}
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                />
            </svg>
        </div>
    );
};

export default VacancyHeader;