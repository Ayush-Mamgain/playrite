import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
            status: false,
            userData: null //this serves as cache to access data quickly
            //this user data will contain token that can we sent to server through header
    },
    reducers: {
        loginUser: (state, action) => {
            // console.log(action);
            state.status = true,
            state.userData = action.payload;
        },
        logoutUser: (state) => {
            state.status = false,
            state.userData = null
        }
    }
});

export const { loginUser, logoutUser } = authSlice.actions; //updater functions(setState) for components to update state

export default authSlice.reducer; //to place the slice on the store
