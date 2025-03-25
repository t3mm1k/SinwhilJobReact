function SearchPromt( {main, adInfo, onClick } ) { // Remove setSearchValue, add onClick
    return (
        <div className="search-prompt flex flex-col px-[5px] py-[5px] border-b border-white/25" onClick={onClick} >
            <p className="font-bold text-xs uppercase">{main}</p>
            <p className="opacity-50 text-[0.5em]">{adInfo}</p>
        </div>
    )
}

export default SearchPromt