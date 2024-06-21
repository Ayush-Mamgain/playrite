import apiHandler from '../axios/apiHandler';

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

const getAllBanks = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getAllBanks',
        bodyData
    })
}

const getUserStats = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getUserStats'
    })
}

const getAllMatches = async (bodyData) => {
    return apiHandler({
        method: 'get',
        url: '/user/getAllMatches'
    })
}

export { logout, getUserInfo, getAllBets, getAllTransactions, getUserStatus, getAllBanks, getUserStats, getAllMatches };

