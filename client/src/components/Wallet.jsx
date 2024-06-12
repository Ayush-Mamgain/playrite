import React from 'react';
import WalletLogo from './WalletLogo';

const Wallet = ({amount}) => {
    return (
        <div className='wallet'>
            {amount}
            <WalletLogo />
        </div>
    );
}

export default Wallet;
