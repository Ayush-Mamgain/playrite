import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';
import inputHandler from '../utils/inputHandler';
import { sendOtp } from '../apiServices/otpServices';
import Loading from './Loading';
import toast from 'react-hot-toast';
import Error from './Error';
import OtpModal from './OtpModal';

const RegisterModal = ({ setShowRegister, setShowLogin }) => {
    const [otp, setOtp] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        contact: '',
    });

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false); //can loading be done globally through slice?
    const [error, setError] = useState(null);

    const resetFormData = () => {
        const emptyFormData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = '';
            return acc;
        }, {});
        setFormData(emptyFormData);
    };

    const handleError = (error) => {
        setError(error);
        toast.error(error.message);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const toastId = toast.loading('Loading');
        setLoading(true);
        const bodyData = { ...formData }; //cloning the formData because we don't want to send the

        sendOtp({
            email: formData.email,
        })
            .then((res) => {
                console.log(res);
                setOtp(true);
            })
            .catch((error) => handleError(error))
            .finally(() => {
                setLoading(false);
                toast.dismiss(toastId);
                // resetFormData();
            });
    };

    if (loading) return <Loading />;
    // if(error.statusCode === 500) return <Error error={error}/> --> for server side errors
    if (otp) return <OtpModal {...formData} />;
    return (
        <div className="registerModal">
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
                        setShowRegister(false);
                        setShowLogin(true);
                    }}
                >
                    Sign in
                </Button>
            </p>
        </div>
    );
};

export default RegisterModal;
