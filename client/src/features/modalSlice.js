import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        showLogin: false,
        showRegister: false,
        showTransaction: false
    },
    //we can modify the reducers because at one time only one of the modal will be active
    reducers: {
        setShowLogin: (state, action) => {
            state.showLogin = action.payload
        },
        setShowRegister: (state, action) => {
            state.showRegister = action.payload;
        },
        setShowTransaction: (state, action) => {
            state.showTransaction = action.payload;
        }
    }
});

export const { setShowLogin, setShowRegister, setShowTransaction } = modalSlice.actions;

export default modalSlice.reducer;