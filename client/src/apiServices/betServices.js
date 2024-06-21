import apiHandler from "../axios/apiHandler"

const placeBet = async(bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/bet/placeBet',
        bodyData
    });
}

const settleBet = async (bodyData) => {
    return apiHandler({
        method: 'patch',
        url: '/bet/settleBet',
        bodyData
    })
}

export { placeBet, settleBet };