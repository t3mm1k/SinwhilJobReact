function CheckButtons({photo}) {
    return (
        <div className="flex gap-[10px] font-[700]">
            {photo.length > 0 ? (
                <button className="rounded-[10px] border-2 border-white  bg-[var(--first-background-dark)] text-white px-[10px] py-[5px] flex-grow">Посмотреть фото</button>) : null}
            <button className="rounded-[10px] border-2 border-white  bg-white text-[var(--first-background-dark)] px-[10px] py-[5px] flex-grow">Посмотреть на карте</button>
        </div>
    )
}

export default CheckButtons;

