import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";

export default function () {
    return (
        <div className="flex flex-col justify-between w-full p-[20px] h-full">
            <Header />
            <Footer />
        </div>
    )
}