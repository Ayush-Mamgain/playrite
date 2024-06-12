import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../api/userServices'
import { logoutUser } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        await logout()
            .then(() => {
                dispatch(logoutUser());
                navigate('/');
            })
            .catch() //here we have to setError true, but error should be present in the slice
        //TODO: const { data, loading, error } = logout
    }
    
    return (
        <button className="logoutBtn" onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
