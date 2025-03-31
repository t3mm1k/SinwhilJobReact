import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();


    return (
        <div className="flex justify-between   h-auto">
            <button className="flex items-center justify-center gap-[5px] text-[0.8rem]" onClick={() => navigate('/')}>
                <img src="./img/icons/arrow-left.svg" alt="Назад" />
                Назад
            </button>
            <p>Профиль</p>
            <p></p>
        </div>
    );
}

export default Header;