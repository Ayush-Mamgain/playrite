import React from 'react';
import WalletLogo from './WalletLogo';

const Wallet = ({walletAmount, onHit}) => {
    return (
        <div className='wallet'>
            {walletAmount}
            <WalletLogo onHit={onHit}/>
        </div>
    );
}

export default Wallet;
