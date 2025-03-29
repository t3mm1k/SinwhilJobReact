import react from 'react';
import './Option.css'

function Option({position, salary, marketplace, vacancy_type }) {
    let logoSrc = '';
    switch (marketplace) {
        case 'Wildberries': logoSrc = './img/marketplace-logo/Wildberries.png'; break;
        case 'Yandex': logoSrc = './img/marketplace-logo/Yandex.png'; break;
        case 'Ozon': logoSrc = './img/marketplace-logo/Ozon.png'; break;
        case 'Avito': logoSrc = './img/marketplace-logo/Avito.png'; break;
        case 'Boxberry': logoSrc = './img/marketplace-logo/Boxberry.png'; break;
        default: logoSrc = './img/icons/logo-dark.svg';
    }

    let salaryText = vacancy_type === "part_time" ? " / за смену" : " / в месяц";

    return (
        <button className="option flex gap-[15px] py-[10px] items-center">
            <img className="w-[40px] rounded-full" src={logoSrc}/>
            <div className="flex flex-col gap-[2px] text-left text-[14px]">
                <p className="font-bold">{position}</p>
                <p className="text-[0.7em]">{salary} {salaryText}</p>
            </div>
        </button>
    )
}

export default Option;