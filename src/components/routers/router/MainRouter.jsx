import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import SignIn from "../../screens/auth/SignIn";


const MainRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<AppRouter />} />
            <Route path="/sign-up" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn type="SIGNIN" />} />
        </Routes>
    )
}

export default MainRouter
