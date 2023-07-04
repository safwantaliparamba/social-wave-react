//react and third party imports
import React from 'react'
import { Route, Routes } from "react-router-dom";

// local imports 
import Home from '../../screens/main/Home';
import Nav from '../../includes/home/Nav';
import MainAnalytics from '../../screens/main/analytics/MainAnalytics';
import SettingsRoutes from './SettingsRoutes';


const AppRouter = () => {
    return (
        <Nav>
            <Routes>
                <Route path=''>
                    <Route index element={<Home />} />
                    <Route path="settings/*" element={<SettingsRoutes />} />
                    <Route path="analytics/" element={<MainAnalytics />} />
                </Route>
            </Routes>
        </Nav>
    )
}

export default AppRouter