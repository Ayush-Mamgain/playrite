import React, { useEffect, useState } from 'react';
import DepositBtn from './DepositBtn';
import WithdrawBtn from './WithdrawBtn';
import { useSelector } from 'react-redux';
import Banks from './Banks';
import Button from './Button';
import Input from './Input';
import RegisterBank from './RegisterBank';

const TransactionModal = ({ handleClose }) => {
    const walletAmount = useSelector((state) => state.wallet.balance);
    const [transaction, setTransaction] = useState({
        amount: 0,
        deposit: true,
    });
    const [addBank, setAddBank] = useState(false);

    // handleClose(() => setTransaction({ amount: 0, deposit: true }));

    return (
        <div className="transactionModal">
            {`₹${walletAmount}`}
            <form>
                <Input
                    label="Deposit"
                    type="radio"
                    checked={transaction.deposit}
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
                    label="Withdraw"
                    type="radio"
                    checked={!transaction.deposit}
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
                    value={transaction.amount}
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
            {!transaction.deposit && (
                <Button
                    onHit={() => setAddBank((prevState) => !prevState)}
                >
                    {addBank ? 'Close' : 'Add Bank'}
                </Button>
            )}
            {addBank && <RegisterBank setAddBank={setAddBank}/>}
        </div>
    );
};

export default TransactionModal;
