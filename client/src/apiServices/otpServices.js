import apiHandler from "../axios/apiCall";

const BASE_URL = import.meta.env.VITE_API_URL;

const sendOtp = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/otp/sendOtp',
        bodyData
    })
}

const verifyOtp = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/otp/verifyOtp',
        bodyData
    })
}

export { sendOtp, verifyOtp };