import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../apiServices/otpServices';
import { login, register } from '../apiServices/authServices';
import { loginUser } from '../features/authSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setShowRegister } from '../features/modalSlice';
import resetForm from '../utils/resetForm';

const OtpModal = ({formData, setFormData, setShowOtp}) => {
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (event) => {
        event.preventDefault();

        const toastId = toast.loading('Loading...');

        verifyOtp({ email: formData.email, otp })
            .then((res) => {
                console.log(res);
                toast.success('OTP verified successfully');
                console.log(formData);
                register({...formData}).then((res) => {
                    console.log(res);
                    login({
                        email: formData.email,
                        password: formData.password
                    }).then((res) => {
                        console.log(res);
                        dispatch(loginUser(res.data.token));
                        dispatch(setShowRegister(false));
                        resetForm(formData, setFormData);
                        setShowOtp(false);
                        navigate('/');
                    });
                });
            })
            .catch((error) => toast.error(error.message))
            .finally(() => {
                toast.dismiss(toastId);
                setOtp('');
            });
    };

    return (
        <div className="otpModal">
            <h1>Verify OTP</h1>
            <form onSubmit={submitHandler}>
                <Input
                    type="text"
                    label="OTP"
                    placeholder="Enter OTP"
                    onMutate={(event) => setOtp(event.target.value)}
                    value={otp}
                />
                <Button>Submit</Button>
            </form>
        </div>
    );
};

export default OtpModal;
