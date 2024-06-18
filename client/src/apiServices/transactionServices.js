import apiHandler from "../axios/apiHandler";

const createDepositOrder = (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/transaction/createDepositOrder',
        bodyData
    });
}

const withdraw = (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/transaction/testWithdraw',
        bodyData
    });
}

const depositCallback = (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/transaction/depositCallback',
        bodyData
    })
}

export { createDepositOrder, withdraw, depositCallback };