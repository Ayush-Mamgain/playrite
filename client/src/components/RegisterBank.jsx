import React from 'react';
import { useState } from 'react';
import Input from './Input';
import { registerBank } from '../apiServices/bankServices';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addBank } from '../features/bankSlice';
import Button from './Button';
import resetForm from '../utils/resetForm';

const RegisterBank = ({setAddBank}) => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        accountNumber: '',
        ifscCode: '',
        bankName: '',
    });

    const changeHandler = (event) => {
        setFormData((formData) => {
            return {
                ...formData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const toastId = toast.loading('Registering bank...');
        registerBank(formData)
            .then(res => {
                console.log(res);
                dispatch(addBank(res.data));
                resetForm(formData, setFormData);
                setAddBank(false);
                toast.success('Bank registered successfully');
            })
            .catch(error => {
                toast.error(error.message);
            })
            .finally(() => toast.dismiss(toastId));
    };

    return (
        <div className="registerBank">
            <form onSubmit={submitHandler}>
                <Input
                    name="accountNumber"
                    onMutate={changeHandler}
                    type="text"
                    value={formData.accountNumber}
                    label='Account Number'
                />
                <Input
                    name="ifscCode"
                    onMutate={changeHandler}
                    type="text"
                    value={formData.ifscCode}
                    label='IFSC Code'
                />
                <Input
                    name="bankName"
                    onMutate={changeHandler}
                    type="text"
                    value={formData.bankName}
                    label='Bank Name'
                />
                <Button>Submit</Button>
            </form>
        </div>
    );
};

export default RegisterBank;
