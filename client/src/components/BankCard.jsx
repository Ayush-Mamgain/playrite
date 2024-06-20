import React from 'react';
import { useDispatch } from 'react-redux';
import { selectBank } from '../features/bankSlice';

const BankCard = ({bank}) => {
    return (
        <div className='bankCard'>
            {bank.bankName}
        </div>
    );
}

export default BankCard;
