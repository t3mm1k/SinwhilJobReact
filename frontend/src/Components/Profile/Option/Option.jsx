function option(props) {
    return (
        <button className="flex gap-[5px]  items-center rounded-[10px] w-full px-3 py-2 bg-[var(--second-background-color)]" index={props.index}>
            <img src={`./img/icons/${props.type}.svg`} alt={props.label} />
            <div className="flex gap-[10px] items-center justify-between flex-grow">
                <p>{props.label}</p>
                <div className="flex gap-2">
                    <p>{props.value}</p>
                    <img src="./img/icons/arrow-right.svg" alt="" />
                </div>
            </div>
        </button>
    );
}
export default option