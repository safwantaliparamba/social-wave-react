import { createSlice } from "@reduxjs/toolkit";
import api, { authApi } from "../config/axios";

const getItem = (title = "") => {
    const item = localStorage.getItem(title)

    if (item?.toLowerCase() === "true") {
        return true;
    } else if (item?.toLowerCase() === "false") {
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
    sessionId: getItem("sessionId"),
    accessToken: getItem("accessToken"),
    refreshToken: getItem("refreshToken"),
    isAuthenticated: getItem("isAuthenticated"),
}


const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email, name, username, accessToken, refreshToken, sessionId } = payload

            setItem("name", name)
            setItem("email", email)
            setItem("username", username)
            setItem("sessionId", sessionId)
            setItem("accessToken", accessToken)
            setItem("refreshToken", refreshToken)
            setItem("isAuthenticated", true)

            return {
                ...state, ...payload, isAuthenticated: true
            }
        },
        editUserData: (state, { payload }) => {
            const { name = state.name, email = state.email, username = state.username, sessionId = state.sessionId } = payload

            setItem("name", name)
            setItem("email", email)
            setItem("username", username)
            setItem("sessionId", sessionId)

            return { ...state, ...payload }
        },
        logout: (state) => {
            // return api
            //     .post(`/accounts/sign-out/${state.sessionId}/`)
            //     .then(res => {
            //         const { statusCode } = res.data

            //         if (statusCode === 6000) {
            //             localStorage.clear()
            //             return { ...initialState, isAuthenticated: false }
            //         } else {
            //             return { ...state }
            //         }
            //     })
            //     .catch(err => console.log(err.message))
            localStorage.clear()

            return { ...initialState, isAuthenticated: false, sessionId: null }
        }
    }
})

export default authSlice.reducer

export const { login, logout, editUserData } = authSlice.actions
