import { createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../components/functions";


const initialState = {
    sessions: JSON.parse(getItem("sessions")) ?? [],
    activeIndex: getItem("activeIndex") ?? -1,
    isAuthenticated: getItem("isAuthenticated") ?? false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            const { email } = payload

            let tempSessions = [...state.sessions]
            const index = tempSessions.findIndex(session => session.email === email)

            if (index !== -1) {
                tempSessions.splice(index, 1, { ...payload })

                const tempState = {
                    ...state,
                    sessions: tempSessions,
                    activeIndex: index,
                    isAuthenticated: true
                }

                setItem("activeIndex", index)
                setItem("isAuthenticated", true)
                setItem("sessions", JSON.stringify(tempSessions))

                return tempState

            } else {
                const sessions = [...state.sessions, { ...payload }]
                const activeIndex = sessions.length - 1
                const tempState = { ...state, sessions, activeIndex: activeIndex, isAuthenticated: true }

                setItem("isAuthenticated", true)
                setItem("activeIndex", activeIndex)
                setItem("sessions", JSON.stringify(sessions))

                return tempState
            }


        },
        editUserData: (state, { payload }) => {
            const tempSessions = [...state.sessions]
            const index = state.activeIndex
            const activeSession = state.sessions[index]

            const tempUser = { ...activeSession, ...payload }
            tempSessions.splice(index, 1, tempUser)

            setItem("sessions", JSON.stringify(tempSessions))

            return { ...state, sessions: tempSessions }
        },
        switchAccount: (state, { payload }) => {
            const { email } = payload

            let tempSessions = [...state.sessions]
            const index = tempSessions.findIndex(session => session.email === email)

            if (index !== -1) {
                setItem("activeIndex", index)

                return { ...state, activeIndex: index }
            }
        },
        logout: (state) => {
            // logic
            state.isAuthenticated = false
        }
    }
})

export default authSlice.reducer

export const { login, logout, editUserData, switchAccount } = authSlice.actions
