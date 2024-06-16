import React from 'react';

const BetCard = ({bet}) => {
    return (
        <div className='betCard'>
            {
                `${bet.battle.players[0].playerName} vs ${bet.battle.players[1].playerName}`
            }
        </div>
    );
}

export default BetCard;
