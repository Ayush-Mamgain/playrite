import React, { useCallback, useState } from 'react';
import Button from './Button';
import toast from 'react-hot-toast';
import { withdraw } from '../apiServices/transactionServices';
import { useDispatch } from 'react-redux';
import { decrementBalance } from '../features/walletSlice';

const WithdrawBtn = ({amount, bankId}) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    //the whole withdraw functionality can be done inside a custom hook (useWithdraw)
    const withdrawHandler = useCallback(async () => {
        const toastId = toast.loading('Withdrawal in progress...');
        setLoading(true);
        await withdraw({
            amount,
            bankId
        })
        .then(res => {
            console.log(res);
            toast.success('Withdrawal successful');
            dispatch(decrementBalance(res.data.amount));
        })
        .catch(error => toast.error(error.message))
        .finally(() => {
            toast.dismiss(toastId);
            setLoading(false);
    });
    }, [amount, bankId]);

    return (
        <Button className='withdrawBtn' onHit={withdrawHandler} disabled={loading}>
            Withdraw ₹{amount}
        </Button>
    );
}

export default React.memo(WithdrawBtn);
