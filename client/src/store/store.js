import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import modalReducer from '../features/modalSlice';
import walletReducer from "../features/walletSlice";
import profileReducer from '../features/profileSlice'
import bankReducer from '../features/bankSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        modal: modalReducer,
        wallet: walletReducer,
        profile: profileReducer,
        bank: bankReducer
    }
});

export default store;