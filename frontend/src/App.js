// App.js
import './App.css';
import Main from "./Pages/Main";
import Vacancy from "./Pages/Vacancy";
import Profile from "./Pages/Profile";
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Router components

export default function App() {
    return (
        <BrowserRouter> {/* Wrap with BrowserRouter */}
            <Routes> {/* Define routes */}
                <Route path="/" element={<Main />} /> {/* Main page route */}
                <Route path="/vacancy" element={<Vacancy />} /> {/* Vacancy page route */}
                <Route path="/profile" element={ <Profile /> } />
            </Routes>
        </BrowserRouter>
    );
}