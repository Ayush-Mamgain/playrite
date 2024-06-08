import axios from "axios";
import asyncHandler, { apiCall } from "../utils/asyncHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

const sendOtp = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/otp/sendOtp`;
    return apiCall(API_URL, 'post', reqData);
}, 'send OTP');

const verifyOtp = asyncHandler(async (reqData) => {
    const API_URL = `${BASE_URL}/otp/verifyOtp`;
    return apiCall(API_URL, 'post', reqData);
}, 'verify OTP');

export { sendOtp, verifyOtp };