import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    //if theme already set then it will take that value or the default value - LIGHT
    theme: localStorage.getItem("THEME") ?? 'DARK', // LIGHT or DARK
    locations: []
}

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        changeTheme: (state, { payload }) => {
            const { theme } = payload;
            state.theme = theme

            localStorage.setItem('THEME', theme)
        },
        pushState: (state, { payload }) => {
            state.locations.push(payload)
        }
    }
})

export default uiSlice.reducer

export const { changeTheme, pushState } = uiSlice.actions 