import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

const Loading = () => {
    useEffect(() => {
        const toastId = toast.loading('Loading...');
        return () => {
            toast.dismiss(toastId);
        }
    }, [])
    return (
        <div className='loading'>
            LOADING...
        </div>
    );
}

export default Loading;
