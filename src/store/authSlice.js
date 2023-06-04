import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../config/axios";

const getItem = (title) => {
    const item = localStorage.getItem(title)

    if (item?.toLowerCase?.() === "true") {
        return true;
    } else if (item?.toLowerCase?.() === "false") {
        return false;
    } else {
        return item;
    }
}

const setItem = (title, item) => {
    localStorage.setItem(title, item);

    return true
}

const initialState = {
    email: getItem("email"),
    name: getItem("name"),
    username: getItem("username"),
    sessionId: getItem("session_id"),
    accessToken: getItem("access_token"),
    refreshToken: getItem("refresh_token"),
    isAuthenticated: getItem("is_authenticated"),
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email, username, accessToken, refreshToken, sessionId } = payload

            setItem("email", email)
            setItem("username", username)
            setItem("sessionId", sessionId)
            setItem("accessToken", accessToken)
            setItem("refreshToken", refreshToken)

            return {
                ...state, ...payload, isAuthenticated: true
            }
        },
        logout: (state) => {
            // authApi
            //     .post('/accounts/logout/')
        }
    }
})

export default authSlice.reducer

export const { login, logout } = authSlice.actions
