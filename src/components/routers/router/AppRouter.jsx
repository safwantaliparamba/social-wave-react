//react and third party imports
import React from 'react'
import { Route, Routes } from "react-router-dom";

// local imports 
import Home from '../../screens/main/Home';
import Nav from '../../includes/home/Nav';
import Settings from '../../screens/main/Settings';


const AppRouter = () => {
    return (
        <Nav>
            <Routes>
                <Route path='' element={<Home />}>
                    <Route path="settings/" element={<Settings />} />
                </Route>
            </Routes>
        </Nav>
    )
}

export default AppRouter