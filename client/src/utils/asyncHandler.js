import axios from "axios";

export default function asyncHandler(asyncTask, name) {
    return async function (reqData) {
        try {
            //what if I don't send any data?
            return await asyncTask({ ...reqData });
        } catch (error) {
            console.error(`Error in :: ${name} :: \n`, error);
            throw error; //Throwing the error because component should handle it own it's own
            //actual error --> error.response.data.
            //Error handling: 
            //1. Server side (500) --> separate error page, nothing can be done
            //2. Client side --> inform the user through react toast --> error.message
        }
    }
}

export const apiCall = async (API_URL, methodType, reqData) => {
    return methodType == 'get' ? await axios[methodType](API_URL,
        {
            withCredentials: true,
            headers: {
                'Content-Type': 'Application/JSON'
            }
        }).then(res => res.data) :
        await axios[methodType](API_URL, { ...reqData }, {
            withCredentials: true, headers: {
                'Content-Type': 'Application/JSON'
            }
        }).then(res => res.data)
}

//if status code == 500 then server side error --> <ErrorPage />
//else client side error -->react toast.error(error.message)
