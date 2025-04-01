import Option from "../Option/Option";
import { useSelector } from 'react-redux';

const types = ["resume", "favorites", "help"]

function OptionsForm() {
    const favorites = useSelector((state) => state.user.favorites);

    return(
        <div className="flex flex-col w-full overflow-auto gap-2">
            {types.map((type, index) => {
                console.log(typeof type, index)
                switch(type){
                    case ("balance"): return <Option index={index} type={type} label="Баланс" value="Пополнить"/>
                    case ("favorites"): return <Option index={index} type={type} label="Избранное" value={favorites.length}/>
                    case ("help"): return <Option index={index} type={type} label="Помощь" value=""/>
                    case ("resume"): return <Option index={index} type={type} label="Мое резюме" value=""/>
                    
                }
                

            })}

        </div>
    )
}
export default OptionsForm