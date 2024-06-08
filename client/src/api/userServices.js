import axios from "axios";
import asyncHandler, {apiCall} from "../utils/asyncHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

const logout = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/user/logout`;
    return apiCall(API_URL, 'post', reqData);
}, 'logout');

const getUserInfo = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/user/getUserInfo`;
    return apiCall(API_URL, 'get', reqData);
}, 'get user info');

const getAllBets = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/user/getAllBets`;
    return apiCall(API_URL, 'get', reqData);
}, 'get all bets');

const getAllTransactions = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/user/getAllTransactions`;
    return apiCall(API_URL, 'get', reqData);
}, 'get All Transactions');

export { logout, getUserInfo, getAllBets, getAllTransactions };

