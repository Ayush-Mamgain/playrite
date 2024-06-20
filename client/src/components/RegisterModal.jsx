import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import inputHandler from '../utils/inputHandler';
import { sendOtp } from '../apiServices/otpServices';
import toast from 'react-hot-toast';
import OtpModal from './OtpModal';
import { useDispatch } from 'react-redux';
import { setShowLogin, setShowRegister } from '../features/modalSlice';
import resetForm from '../utils/resetForm';

const RegisterModal = ({handleClose}) => {
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        contact: '',
    });

    const [loading, setLoading] = useState(false); //can loading be done globally through slice?

    handleClose(() => resetForm(formData, setFormData)); //should this be put inside useEffec

    const submitHandler = (event) => {
        event.preventDefault();
        const toastId = toast.loading('Loading');
        setLoading(true);
        const bodyData = { ...formData }; //cloning the formData because we don't want to send the state directly
        console.log(bodyData);

        sendOtp({
            email: bodyData.email,
        })
            .then((res) => {
                console.log(res);
                setOtp(true);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => {
                setLoading(false);
                toast.dismiss(toastId);
            });
    };

    if (otp)
        return (
            <OtpModal
                formData={formData}
                setFormData={setFormData}
                setShowOtp={setOtp}
            />
        );
    return (
        <div className="registerModal form-wrapper">
            {loading && (
                <div className="form-overlay">
                    {/* <span>Loading...</span> */}
                </div>
            )}
            <h1>Register</h1>
            <form onSubmit={submitHandler}>
                <Input
                    label="Email"
                    type="email"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="email"
                    value={formData.email}
                />
                <Input
                    label="Username"
                    type="text"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="username"
                    value={formData.username}
                />
                <Input
                    label="Contact Number"
                    type="text"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="contact"
                    value={formData.contact}
                />
                <Input
                    label="Password"
                    type="password"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="password"
                    value={formData.password}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    onMutate={(event) => inputHandler(event, setFormData)}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                />
                <Button>Register</Button>
            </form>
            <p>
                Already registered?{' '}
                <Button
                    onHit={() => {
                        dispatch(setShowRegister(false));
                        dispatch(setShowLogin(true));
                    }}
                >
                    Sign in
                </Button>
            </p>
        </div>
    );
};

export default RegisterModal;
