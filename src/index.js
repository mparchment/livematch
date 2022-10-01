import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Splash from './Splash';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./components/Landing";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/Map" element={<App/>}/>
            <Route path="/" element={<Landing/>}/>
        </Routes>
        <App/>
    </BrowserRouter>
);
