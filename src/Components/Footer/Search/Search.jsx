
import SearchPromt from "./SearchPromt";

function Filter() {
    return (
        <div className="flex relative flex-col z-[200] bg-[color:var(--second-background-dark)] p-2.5 rounded-t-[15px] mx-[20px]">
            <SearchPromt main="ЦСКА" adInfo="123"/>
            <input type="text" className="search-input gap-2.5 border mt-2.5 p-2.5 rounded-[10px] bg-[#242424]" placeholder="Поиск"/>
        </div>
    )
}

export default Filter