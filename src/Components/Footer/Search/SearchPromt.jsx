
function SearchPromt(props) {
    return (
        <div className="search-prompt flex flex-col px-[5px] py-[5px] border-b border-white/25">
            <p className="font-bold text-xs uppercase">{props.main}</p>
            <p className="opacity-50 text-[0.5em]">{props.adInfo}</p>
        </div>
)
}

export default SearchPromt