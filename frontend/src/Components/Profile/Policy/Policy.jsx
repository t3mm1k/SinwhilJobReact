import React from "react";
import { Link } from "react-router-dom";
function Policy(props) {

    return (
        <div className="text-center flex flex-col gap-0 fixed justify-center w-[calc(100vw-30px)] bottom-4 font-normal underline opacity-50">
            <Link to="/privacy">Политика конфидициальности</Link>
            <Link to="/oferta">Публичная оферта</Link>
        </div>
    )
}

export default Policy;