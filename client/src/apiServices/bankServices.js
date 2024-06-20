import apiHandler from "../axios/apiHandler";

const registerBank = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/bank/registerBank',
        bodyData
    })
}

export { registerBank };