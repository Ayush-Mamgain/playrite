import apiHandler from '../axios/apiCall';

//we can also create a separate file for all API url endpoints and then import it here 

const register = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/auth/register',
        bodyData
    })
}

const login = async (bodyData) => {
    return apiHandler({
        method: 'post',
        url: '/auth/login',
        bodyData
    })
    //no need for then-catch block here
    //the axios configuration will handle successful response and errors
}
export { login, register };