import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../components/functions";


// const initialState = {
//     email: getItem("email"),
//     name: getItem("name"),
//     username: getItem("username"),
//     sessionId: getItem("sessionId"),
//     accessToken: getItem("accessToken"),
//     isProMember: getItem("isProMember") ?? false,
//     refreshToken: getItem("refreshToken"),
//     isAuthenticated: getItem("isAuthenticated") ?? false,
//     notificationCount: getItem("notificationCount") ?? 0,
//     bookmarkCount: getItem("bookmarkCount") ?? 0,
// }

const initialState = {
    sessions: getItem("sessions") ?? [],
    activeIndex: getItem("activeIndex") ?? -1,
    isAuthenticated: getItem("isAuthenticated") ?? false,
}

console.log(initialState);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email,
                name,
                username,
                accessToken,
                refreshToken,
                sessionId,
                notificationCount,
                bookmarkCount
            } = payload

            // setItem("name", name)
            // setItem("email", email)
            // setItem("username", username)
            // setItem("sessionId", sessionId)
            // setItem("isAuthenticated", true)
            // setItem("accessToken", accessToken)
            // setItem("refreshToken", refreshToken)
            // setItem("bookmarkCount", bookmarkCount)
            // setItem("notificationCount", notificationCount)

            const isExists = state.sessions.find(session => session.username === username) ?? false

            if (isExists) {
                let tempSessions = [...state.sessions]

                const index = tempSessions.findIndex(session => session.username === username)

                if (index !== -1) {
                    tempSessions.splice(index, 0, { ...payload })

                    const tempState = { ...state, sessions: tempSessions, activeIndex: index}

                    return tempState
                } else {
                    console.log("user not found with the username " + username);
                }
            } else {
                const tempState = { ...state, isAuthenticated: true }
                tempState.sessions.push({ ...payload })
            }


        },
        editUserData: (state, { payload }) => {
            // const {
            //     name = state.name,
            //     email = state.email,
            //     username = state.username,
            //     sessionId = state.sessions,
            //     isProMember = state.isProMember,
            //     bookmarkCount = state.bookmarkCount,
            //     notificationCount = state.notificationCount,
            // } = payload

            // setItem("name", name)
            // setItem("email", email)
            // setItem("username", username)
            // setItem("sessionId", sessionId)
            // setItem("isProMember", isProMember)
            // setItem("bookmarkCount", bookmarkCount)
            // setItem("notificationCount", notificationCount)

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
