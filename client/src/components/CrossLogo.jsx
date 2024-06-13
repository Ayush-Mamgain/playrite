import React from 'react';
import Button from './Button';

const CrossLogo = ({onHit}) => {
    return (
        <div className='corssLogo' onClick={onHit}>
            Cross
        </div>
    );
}

export default CrossLogo;
