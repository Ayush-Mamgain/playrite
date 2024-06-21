import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import {
    createDepositOrder,
    depositCallback,
    depositErrorCallback,
} from '../apiServices/transactionServices';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch, useSelector } from 'react-redux';
import { incrementBalance } from '../features/walletSlice';
import { setShowTransaction } from '../features/modalSlice';

const DepositBtn = ({ amount }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const user = useSelector((state) => state.profile.user);

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
            const options = {
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
                            dispatch(incrementBalance(res.data.amount / 100)); //amount will be in paisa
                            navigate('/');
                        })
                        .catch((error) => toast.error(error.message)) //call deposit error callback
                        .finally(() => toast.dismiss(toastId));
                },

                modal: {
                    ondismiss: () => {
                        toast.error('Payment cancelled');
                    },
                },
                prefill: {
                    name: user.username,
                    email: user.email,
                    contact: user.contact,
                },
                theme: {
                    color: '#F37254',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response) {
                //callback function when payment fails
                //all error details are found in response.error object
                console.log(response);
                toast.error('Payment failed');
                depositErrorCallback(response.error);
            });
            rzp.open();
        },
        [user]
    );

    const depositHandler = useCallback(
        async (event) => {
            event.preventDefault();
            setLoading(true);
            await createOrder(amount)
                .then((order) =>
                    initiatePayment(order).then(() =>
                        dispatch(setShowTransaction(false))
                    )
                )
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
