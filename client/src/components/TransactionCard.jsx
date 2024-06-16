import React from 'react';

const TransactionCard = ({transaction}) => {
    console.log(transaction);
    return (
        <div className='transactionCard'>
            {transaction.type}
        </div>
    );
}

export default TransactionCard;
