//react and third party imports
import React from 'react'
import { Route, Routes } from "react-router-dom";

// local imports 
import Home from '../../screens/Home';
import Nav from '../../includes/home/Nav';


const AppRouter = () => {
    return (
        <Nav>
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </Nav>
    )
}

export default AppRouter