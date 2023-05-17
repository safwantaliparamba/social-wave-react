import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

import AppRouter from "./AppRouter";
import SignIn from "../../screens/auth/SignIn";


const MainRouter = () => {
    return (
        <Routes>
            <Route path="/*" element={<AppRouter />} />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
    )
}

export default MainRouter
