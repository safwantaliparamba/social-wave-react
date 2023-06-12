// import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import SignUp from "../../screens/auth/SignUp";
import PrivateRoute from "../routes/PrivateRoute";


const MainRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<PrivateRoute><AppRouter /></PrivateRoute>} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignUp type="SIGNIN" />} />
        </Routes>
    )
}

export default MainRouter
