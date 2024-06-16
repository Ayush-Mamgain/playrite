import React, { useEffect, useState } from 'react';
import { getAllTransactions } from '../apiServices/userServices';
import toast from 'react-hot-toast';
import TransactionCard from '../components/TransactionCard';
import { useSelector } from 'react-redux';

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    const userId = useSelector((state) => state.auth.userData._id);

    useEffect(() => {
        console.log('User id:\n', userId);

        getAllTransactions()
            .then((res) => {
                console.log(res);
                toast.success('All transactions fetched successfully');
                setTransactions(res.data);
            })
            .catch((error) => toast.error(error.message));
    }, []);

    return (
        <div className="transactions">
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction._id}>
                        <TransactionCard transaction={transaction} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Transactions;
