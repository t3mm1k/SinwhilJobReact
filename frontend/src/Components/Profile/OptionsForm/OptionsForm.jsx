import Option from "../Option/Option";
import { useSelector } from 'react-redux';
import {useNavigate} from "react-router-dom";

const types = ["resume", "favorites", "help"]

function OptionsForm() {
    const favorites = useSelector((state) => state.user.favorites);
    const navigate = useNavigate();

    return(
        <div className="flex flex-col w-full overflow-auto gap-2 relative z-0">
            {types.map((type, index) => {
                switch(type){
                    case ("balance"): return <Option index={index} type={type} label="Баланс" value="Пополнить" onClick={() => navigate(`/${type}`)} />
                    case ("favorites"): return <Option index={index} type={type} label="Избранное" value={favorites.length} onClick={() => navigate(`/${type}`)} />
                    case ("help"): return <Option index={index} type={type} label="Помощь" value="" onClick={() => navigate(`/${type}`)} />
                    case ("resume"): return <Option index={index} type={type} label="Мое резюме" value="" onClick={() => navigate(`/${type}`)} />
                    
                }
                

            })}

        </div>
    )
}
export default OptionsForm