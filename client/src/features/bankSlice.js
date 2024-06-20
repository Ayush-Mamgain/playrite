import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";


const bankSlice = createSlice({
    name: 'bank',
    initialState: {
        banks: [],
        selectedBankId: ''
    },
    reducers: {
        setBank: (state, action) => {
            state.banks = action.payload;
        },
        addBank: (state, action) => {
            state.banks.push(action.payload);
        },
        removeBank: (state, action) => {
            state.banks = state.banks.filter(bank => bank.id !== action.payload);
        },
        selectBank: (state, action) => {
            state.selectedBankId = action.payload
        }
    }
});

export const { setBank, addBank, removeBank, selectBank } = bankSlice.actions;

export default bankSlice.reducer;