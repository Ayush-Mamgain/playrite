import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import inputHandler from '../utils/inputHandler';
import { login } from '../apiServices/authServices';
import Loading from './Loading';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser } from '../features/authSlice';
import Error from './Error';
import { useNavigate } from 'react-router-dom';
import { setShowLogin, setShowRegister } from '../features/modalSlice';
import { setBalance } from '../features/walletSlice';

const LoginModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false); //can loading be done globally through slice?

    const resetFormData = () => {
        const emptyFormData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {});
        setFormData(emptyFormData);
    };

    const loginSuccessHandler = (res) => {
        console.log(res);
        toast.success('Login successful');
        dispatch(loginUser(res.data.token));
        dispatch(setBalance(res.data.wallet));
        dispatch(setShowLogin(false));
        dispatch(setShowRegister(false));
        navigate('/');
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const toastId = toast.loading('Loading');
        setLoading(true);
        const bodyData = { ...formData }; //cloning the formData because we don't want to send the
        login(bodyData)
            .then((res) => loginSuccessHandler(res))
            .catch((error) => toast.error(error.message))
            .finally(() => {
                setLoading(false);
                toast.dismiss(toastId);
                resetFormData();
            });
    };

    return (
        <div className='form-wrapper'>
            <h1>Sign In</h1>
            {loading && (
                <div className="form-overlay">
                    
                </div>
            )}
            <form onSubmit={submitHandler}>
                <Input
                    label="Email"
                    type="email"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="email"
                    value={formData.email}
                />
                <Input
                    label="Password"
                    type="password"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="password"
                    value={formData.password}
                />
                <Button>Sign In</Button>
            </form>
            <p>
                Don't have an account?{' '}
                <Button
                    onHit={() => {
                        dispatch(setShowRegister(true));
                        dispatch(setShowLogin(false));
                    }}
                >
                    Register
                </Button>
            </p>
        </div>
    );
};

export default LoginModal;
