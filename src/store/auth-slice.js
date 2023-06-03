import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        access: localStorage.getItem("access") === "true" ? true : false,
        userId: localStorage.getItem("userId"),
    },
    reducers: {
        login(state, action) {
            console.log(action.payload)
            localStorage.setItem("access", action.payload.access);
            localStorage.setItem("userId", action.payload.user.id);
            state.access = localStorage.getItem("access");
            state.userId = localStorage.getItem("userId");
        },

        logout(state) {
            localStorage.removeItem("access");
            localStorage.removeItem("userId");
            state.access = localStorage.getItem("access");
            state.userId = localStorage.getItem("userId");
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;