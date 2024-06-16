import React, { useState } from 'react';
import DepositBtn from './DepositBtn';
import WithdrawBtn from './WithdrawBtn';
import { useSelector } from 'react-redux';
import Banks from './Banks';
import Button from './Button';
import Input from './Input';

const TransactionModal = () => {
    const walletAmount = useSelector((state) => state.wallet.balance);
    const [transaction, setTransaction] = useState({
        amount: 0,
        deposit: true,
    });

    return (
        <div className="transactionModal">
            {`₹${walletAmount}`}
            <form>
                <Input
                    name='transactionType'
                    label="Deposit"
                    type="radio"
                    onMutate={(event) =>
                        setTransaction((prevState) => {
                            return {
                                ...prevState,
                                deposit: true,
                            };
                        })
                    }
                />
                <Input
                    name='transactionType'
                    label="Withdraw"
                    type="radio"
                    onMutate={(event) =>
                        setTransaction((prevState) => {
                            return {
                                ...prevState,
                                deposit: false,
                            };
                        })
                    }
                />
                <Input
                    type="number"
                    label="Amount"
                    onMutate={(event) =>
                        setTransaction((prevState) => {
                            return {
                                ...prevState,
                                amount: event.target.value,
                            };
                        })
                    }
                />
                {transaction.deposit ? (
                    <DepositBtn amount={transaction.amount} />
                ) : (
                    <WithdrawBtn amount={transaction.amount} />
                )}
            </form>
            {!transaction.deposit && <Banks />}
        </div>
    );
};

export default TransactionModal;
