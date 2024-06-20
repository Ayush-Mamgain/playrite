import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BankCard from './BankCard';
import Input from './Input';
import { selectBank } from '../features/bankSlice';

const Banks = () => {
    const banks = useSelector((state) => state.bank.banks);
    const selectedBankId = useSelector((state) => state.bank.selectedBankId);
    const dispatch = useDispatch();
    return (
        <div className="banks">
            <ul>
                {banks.map((bank) => (
                    // <li key={bank._id}>
                    //     <BankCard bank={bank} />
                    // </li>
                    <li key={bank._id}>
                        <Input
                            type="radio"
                            onChange={() => dispatch(selectBank(bank._id))}
                            checked={bank._id === selectedBankId}
                            label={
                                <BankCard
                                    bank={bank}
                                />
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Banks;
