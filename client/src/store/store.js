import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import modalReducer from '../features/modalSlice';
import walletReducer from "../features/walletSlice";
import userReducer from '../features/profileSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        wallet: walletReducer,
        user: userReducer
    }
});

export default store;