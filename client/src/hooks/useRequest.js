import { useCallback, useEffect, useState } from "react";
import apiCall from "../axios/apiCall";
import toast from "react-hot-toast";

//this useFetch will be used by API services becasue each API service know the method type and URL for each request. It will receive request body Data directly from component

export const useRequest = (reqData, callback) => {
    //reqData will be an object having keys {method, url, bodyData, headers, params}
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const toastId = toast.loading('Loading...');
        apiCall({...reqData})
        .then(res => {
            console.log(res);
            setData(res);
            callback && callback(res);
        })
        .catch(error => {
            setError(error);
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
            toast.dismiss(toastId);
        })
    }, [reqData])

    // const fetchData = useCallback(async () => {
    //     const loadToastId = toast.loading('Loading...');
    //     setLoading(true);
    //     await apiCall({ ...reqData })
    //         .then(res => {
    //             console.log(res);
    //             setData(res);
    //             callback(res); //this would be execueted after the response is succesful
    //         })
    //         .catch(error => {
    //             console.error(error);
    //             toast.error(error);
    //             setError(error);
    //             //I would also want to navigate to '/error' in case of server side error
    //         })
    //         .finally(() => {
    //             toast.dismiss(loadToastId);
    //             setLoading(false);
    //         });
    // }, [reqData])

    return { data, loading, error };
}