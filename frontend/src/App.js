// App.js
import './App.css';
import Main from "./Pages/Main";
import Vacancy from "./Pages/Vacancy";
import Profile from "./Pages/Profile";
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom';
import Resume from "./Pages/Resume";
import {useEffect} from "react";
import Favorites from "./Pages/Favorites";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/vacancy" element={<Vacancy />} />
                <Route path="/profile" element={ <Profile /> } />
                <Route path="/resume" element={ <Resume /> } />
                <Route path="/favorites" element={ <Favorites /> } />
            </Routes>
        </BrowserRouter>
    );
}