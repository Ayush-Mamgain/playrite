import React from 'react';
import WalletLogo from './WalletLogo';
import { useSelector } from 'react-redux';

const Wallet = ({onHit}) => {
    const walletBalance = useSelector(state => state.wallet.balance)
    return (
        <div className='wallet'>
            {walletBalance}
            <WalletLogo onHit={onHit}/>
        </div>
    );
}

export default Wallet;
