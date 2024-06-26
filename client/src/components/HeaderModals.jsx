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
    const showModal = useSelector(state => state.modal);

    // let loginClose;
    // let registerClose;
    // let transactionClose;

    // function setLoginClose(func) {
    //     loginClose = func;
    // }
    // function setRegisterClose(func) {
    //     registerClose = func;
    // }
    // function setTransactionClose(func) {
    //     transactionClose = func;
    // }

    return (
        <div className='headerModals'>
            <Modal
                show={showModal.showLogin}
                handleClose={() => {
                    dispatch(setShowLogin(false));
                    // loginClose();
                }}
            >
                <LoginModal />
            </Modal>
            <Modal
                show={showModal.showRegister}
                handleClose={() => {
                    dispatch(setShowRegister(false));
                    // registerClose();
                }}
                    
            >
                <RegisterModal />
            </Modal>
            <Modal
                show={showModal.showTransaction}
                handleClose={() => {
                    dispatch(setShowTransaction(false));
                    // transactionClose();
                }}
            >
                <TransactionModal />
            </Modal>
        </div>
    );
}

export default HeaderModals;
