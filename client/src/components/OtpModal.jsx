import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { verifyOtp } from '../apiServices/otpServices';
import { login, register } from '../apiServices/authServices';
import { loginUser } from '../features/authSlice';
import toast from 'react-hot-toast';
import Loading from './Loading';

const OtpModal = ({ email, password, confirmPassword, username, contact }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    const handleError = (error) => {
        setError(error);
        toast.error(error.message);
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const toastId = toast.loading('Loading...');
        setLoading(true);

        verifyOtp({ email, otp })
            .then((res) => {
                console.log(res);
                toast.success('OTP verified successfully');
                register({ email, username, password, confirmPassword, contact }).then((res) => {
                    console.log(res);
                    login({
                        email, password
                    }).then((res) => {
                        console.log(res);
                        dispatch(loginUser(res.data));
                        //navigate to the home page
                    });
                });
            })
            .catch((error) => handleError(error))
            .finally(() => {
                setLoading(false);
                toast.dismiss(toastId);
                setOtp('');
            });
    };

    if (loading) return <Loading />;
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
