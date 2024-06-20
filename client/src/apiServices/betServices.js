import apiHandler from "../axios/apiHandler"

const placeBet = async(bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/bet/placeBet',
        bodyData
    });
}

export { placeBet };