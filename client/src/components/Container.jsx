import React from 'react';
import Loading from './Loading';
// import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Container = ({loading, error, children, className}) => {
    // const navigate = useNavigate();
    if(loading) return <Loading />
    if(error) {
        // if(error.response.statusCode === 500) navigate('/error');
        toast.error(error);
    }
    return (
        <div className={className}>
            {children}
        </div>
    );
}

export default Container;
