import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Modal from './Modal';
import LoginModal from './LoginModal';
import { setShowLogin } from '../features/modalSlice';

const PrivateRoute = ({children}) => {
    const authStatus = useSelector((state) => state.auth.status);
    const showLogin = useSelector(state => state.modal.showLogin);
    const dispatch = useDispatch();

    if(authStatus)
        return children
    else
        return (
            <Modal show={showLogin} handleClose={() => dispatch(setShowLogin(false))}>
                <LoginModal />
            </Modal>
        )

}

export default PrivateRoute