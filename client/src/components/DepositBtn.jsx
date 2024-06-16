import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
    createDepositOrder,
    depositCallback,
} from '../apiServices/transactionServices';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBalance } from '../features/walletSlice';

const DepositBtn = ({ amount }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const userData = useSelector((state) => state.auth.userData);

    const createOrder = useCallback(async (amount) => {
        const toastId = toast.loading('Creating order...');
        return createDepositOrder({
            amount,
            currency: 'INR',
            // receipt: `$order_${charity.id}_${Date.now()}`, --> this may not be required because we are creating the receipt in the backend
        })
            .then((res) => {
                console.log(res);
                return res.data;
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    }, []);

    const initiatePayment = useCallback(
        async ({ orderId, amount, currency }) => {
            const options = useMemo(
                () => ({
                    key: import.meta.env.VITE_RAZORPAY_KEY,
                    amount,
                    currency,
                    name: 'Playrite',
                    description: 'Deposit for wallet',
                    order_id: orderId,

                    handler: async function (response) {
                        //this function will be called after a successful payment
                        console.log(response);
                        const toastId = toast.loading('Processing payment...');

                        depositCallback(response)
                            .then((res) => {
                                console.log(res);
                                toast.success('Deposit Successful');
                                dispatch(incrementBalance(res.data.amount))
                                navigate('/');
                            })
                            .catch((error) => toast.error(error.message))
                            .finally(() => toast.dismiss(toastId));
                    },

                    modal: {
                        ondismiss: () => {
                            toast.error('Payment cancelled');
                        },
                    },
                    prefill: {
                        name: userData.username, // Replace with actual user name
                        email: userData.email, // Replace with actual user email
                        contact: userData.contact, // Replace with actual user contact
                    },
                    theme: {
                        color: '#F37254',
                    },
                }),
                [userData]
            );

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                //callback function when payment fails
                //all error details are found in response.error object
                console.log(response);
                toast.error('Payment failed');
            });
            rzp.open();
        },
        []
    );

    const depositHandler = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            await createOrder(amount)
                .then((order) => initiatePayment(order))
                .catch((error) => toast.error(error.message))
                .finally(setLoading(false));
        },
        [amount, createOrder, initiatePayment]
    );

    return (
        <Button
            className="depositBtn"
            onClick={depositHandler}
            disabled={loading}
        >
            Deposit ₹{amount}
        </Button>
    );
};

export default React.memo(DepositBtn);
