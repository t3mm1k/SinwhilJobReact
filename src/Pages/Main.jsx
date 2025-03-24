// src/Pages/Main.jsx

import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import Map from "../Components/Map/Map";


export default function () {
    return (
        <div className="flex flex-col justify-between w-full h-full">
            <Header />
            <Map />
            <Footer />
        </div>
    )
}