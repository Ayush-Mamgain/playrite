import React from 'react';
import { useDispatch } from 'react-redux';
// import { logout } from '../api/userServices';
import { logoutUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { logout } from '../apiServices/userServices';

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        const toastId = toast.loading('Loading...');
        await logout()
            .then(() => {
                dispatch(logoutUser());
                toast.success('Logout Successful');
                navigate('/');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    };

    return (
        <button className="logoutBtn" onClick={logoutHandler}>
            Logout
        </button>
    );
};

export default LogoutBtn;
