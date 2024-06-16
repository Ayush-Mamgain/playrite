import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    setShowLogin,
    setShowRegister,
    setShowTransaction,
} from '../features/modalSlice';
import Modal from './Modal';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import TransactionModal from './TransactionModal';

const HeaderModals = () => {
    const dispatch = useDispatch();

    const showLogin = useSelector((state) => state.modal.showLogin);
    const showRegister = useSelector((state) => state.modal.showRegister);
    const showTransaction = useSelector((state) => state.modal.showTransaction);

    return (
        <div className='headerModals'>
            <Modal
                show={showLogin}
                handleClose={() => dispatch(setShowLogin(false))}
            >
                <LoginModal />
            </Modal>
            <Modal
                show={showRegister}
                handleClose={() => dispatch(setShowRegister(false))}
            >
                <RegisterModal />
            </Modal>
            <Modal
                show={showTransaction}
                handleClose={() => dispatch(setShowTransaction(false))}
            >
                <TransactionModal />
            </Modal>
        </div>
    );
}

export default HeaderModals;
