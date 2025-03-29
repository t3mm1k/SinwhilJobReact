function CheckButtons({photo}) {
    return (
        <div className="flex gap-[10px] font-[700]">
            {photo.length > 0 ? (
                <button className="text-[0.8rem] rounded-[10px] border-2 border-white  bg-[var(--first-background-color)] text-white px-[10px] py-[7px] flex-grow w-[0%]">Посмотреть фото</button>) : null}
            <button className="text-[0.8rem] rounded-[10px] border-2 border-white  bg-white text-[var(--first-background-color)] px-[10px] py-[7px] flex-grow w-[0%]">Посмотреть на карте</button>
        </div>
    )
}

export default CheckButtons;

