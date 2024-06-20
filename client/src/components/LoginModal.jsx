import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import inputHandler from '../utils/inputHandler';
import { login } from '../apiServices/authServices';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { loginUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { setShowLogin, setShowRegister } from '../features/modalSlice';
import { setBalance } from '../features/walletSlice';
import resetForm from '../utils/resetForm';
import { setUser } from '../features/profileSlice';

const LoginModal = ({handleClose}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [loading, setLoading] = useState(false); //can loading be done globally through slice?

    handleClose(() => resetForm(formData, setFormData)); //should this be put inside useEffect?

    const loginSuccessHandler = (res) => {
        console.log(res);
        const user = res.data;
        toast.success('Login successful');
        dispatch(loginUser(res.data.token));
        dispatch(setUser({
            id: user._id,
            username: user.username,
            email: user.email,
            contact: user.contact
        }));
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
                resetForm(formData, setFormData);
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
