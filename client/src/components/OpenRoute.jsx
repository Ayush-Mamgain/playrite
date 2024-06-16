import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({children}) => {
    const authStatus = useSelector(state => state.auth.status);
    if(authStatus) {
        return <Navigate to='/' />
    } else {
        return children;
    }
}

export default OpenRoute;
