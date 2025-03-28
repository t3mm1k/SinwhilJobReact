import CheckButtons from "../CheckButtons/CheckButtons";

function InfoLabel({label, text}) {
    return (
        <div className="flex flex-col text-[12px] text-white font-[700] gap-[2px]">
            <span className="opacity-50 text uppercase text-[0.7em]">{label}</span>
            <span className>{text}</span>
            {label === "Место работы" ? (<CheckButtons photo={[1]}/>) : null}
        </div>
    )
}

export default InfoLabel;