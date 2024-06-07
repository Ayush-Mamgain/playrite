import axios from "axios";

const BASE_URL = import.meta.env.API_URL;

//async functions are wrapped as promises by default

const login = async ({email, password}) => {
    try {
        return await axios.post(`${BASE_URL}/auth/login`, {
            email,
            password
        });
    } catch(error) {
        console.error('Error in :: login :: \n',error);
        throw error;
    }
}

const register = async ({username, contact, email, password, confirmPassword}) => {
    try {
        return await axios.post(`${BASE_URL}/auth/register`, {
            username,
            contact,
            email,
            password,
            confirmPassword
        });
    } catch(error) {
        console.error('Error in :: register :: \n',error);
        throw error;
    }
}

export { login, register };