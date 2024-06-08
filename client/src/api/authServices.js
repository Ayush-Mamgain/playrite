import axios from "axios";
import asyncHandler from "../utils/asyncHandler";
import { apiCall } from "../utils/asyncHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

const register = asyncHandler(async(reqData) => {
    const API_URL = `${BASE_URL}/auth/register`;
    return apiCall(API_URL, 'post', reqData);
}, 'register');

const login = asyncHandler(async(reqData) => {
    const API_URL = `${BASE_URL}/auth/login`;
    return apiCall(API_URL, 'post', reqData);
}, 'login');

export { login, register };