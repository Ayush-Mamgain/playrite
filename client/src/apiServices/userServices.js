import apiHandler from '../axios/apiCall';

const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = `${import.meta.env.VITE_API_URL}/user;  --> less code

const logout = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/user/logout',
        bodyData
    })
}

const getUserInfo = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getUserData',
        bodyData
    })
}

const getAllBets = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getAllBets',
        bodyData
    })
}

const getAllTransactions = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getAllTransactions',
        bodyData
    })
}

const getUserStatus = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getUserStatus',
        bodyData
    })
}

export { logout, getUserInfo, getAllBets, getAllTransactions, getUserStatus };

