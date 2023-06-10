import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import SignIn from "../../../../gitignores/SignIn";
import PrivateRoute from "../routes/PrivateRoute";
import SignUp from "../../screens/auth/SignUp";


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
