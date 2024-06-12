import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;
const token = localStorage.getItem('token');

//same axios instance will be used to send multiple requests
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    },
});

axiosInstance.interceptors.response.use(
    response => {
        console.log(response); //axios response
        return response.data; //actual server response
        //response.data.data --> data returned by the server
    },
    error => {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.error('Error response:', error.response.data);
            return Promise.reject(error.response.data);
        } else if (error.request) {
            // Request was made but no response was received
            console.error('Error request:', error.request);
            return Promise.reject({ message: 'Network error' });
        } else {
            // Something else caused the error
            console.error('Error message:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
)

//axiosInstance(config) will make an api call with the specified config and will return the response

export default function apiHandler({method, url, bodyData = null, headers = null, params = null}) {
    return axiosInstance({
        method,
        url,
        data: bodyData,
        headers,
        params
    });
}

//whenever you want to make an API call just use apiCall()