import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        balance: 0
    },
    reducers: {
        setBalance: (state, action) => {
            state.balance = action.payload;
        },
        incrementBalance: (state, action) => {
            //this is not the global state, it's local state relative to your slice
            // state.wallet.balance += action.payload;
            state.balance += action.payload;
        },
        decrementBalance: (state, action) => {
            state.balance -= action.payload;
        }
    }
});

export const { incrementBalance, decrementBalance, setBalance } = walletSlice.actions;
export default walletSlice.reducer;
