import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    authdata : null,
};

export const login = createSlice({
    name: "auth",
    initialState,
    reducers: { 
        authdata: (state, action) => {
            state.authdata = action.payload;
        },
    },
});

export const { authdata } =
login.actions;
export default login.reducer;
