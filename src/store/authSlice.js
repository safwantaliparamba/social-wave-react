import { createSlice } from "@reduxjs/toolkit";


export const getItem = (title = "", json = false) => {
    const item = localStorage.getItem(title)

    if (item?.toLowerCase() === "true") {
        return true;
    } else if (item?.toLowerCase() === "false") {
        return false;
    } else if (item === "null") {
        return null;
    } else if (item === "undefined") {
        return undefined;
    } else if (json) {
        return JSON.parse(item)
    }

    return item
}

export const setItem = (title, item) => {
    localStorage.setItem(title, item);

    return true
}

const initialState = {
    email: getItem("email"),
    name: getItem("name"),
    username: getItem("username"),
    sessionId: getItem("sessionId"),
    accessToken: getItem("accessToken"),
    isProMember: getItem("isProMember") ?? false,
    refreshToken: getItem("refreshToken"),
    isAuthenticated: getItem("isAuthenticated") ?? false,
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
            const {
                name = state.name,
                email = state.email,
                username = state.username,
                sessionId = state.sessionId,
                isProMember = state.isProMember,
            } = payload

            setItem("name", name)
            setItem("email", email)
            setItem("username", username)
            setItem("isProMember", isProMember)
            setItem("sessionId", sessionId)

            return { ...state, ...payload }
        },
        logout: (state) => {
            localStorage.clear()
            setItem("sessionId", state.sessionId)

            return { ...initialState, isAuthenticated: false }
        }
    }
})

export default authSlice.reducer

export const { login, logout, editUserData } = authSlice.actions
