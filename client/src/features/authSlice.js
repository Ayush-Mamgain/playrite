import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
            status: false,
            token: null //this can be sent in headers
    },
    reducers: {
        loginUser: (state, action) => {
            // console.log(action);
            state.status = true,
            state.token = action.payload;
        },
        logoutUser: (state) => {
            state.status = false,
            state.token = null
        }
    }
});

export const { loginUser, logoutUser } = authSlice.actions; //updater functions(setState) for components to update state

export default authSlice.reducer; //to place the slice on the store
