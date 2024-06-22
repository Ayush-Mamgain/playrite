import React, { useState } from 'react';
import Button from './Button';
import { settleBet } from '../apiServices/betServices';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { updateBalance } from '../features/walletSlice';

const BetCard = ({ bet }) => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [showBtn, setShowBtn] = useState(
        bet.status === 'active' && bet.battle.status === 'over'
    );

    const betSettle = () => {
        setLoading(true);
        const toastId = toast.loading('Settling bet...');
        settleBet({ betId: bet._id })
            .then((res) => {
                console.log(res);
                setShowBtn(false);
                dispatch(updateBalance(res.data.payout));
            })
            .catch((error) => toast.error(error.message))
            .finally(() => {
                toast.dismiss(toastId);
                setLoading(false);
            });
    };

    return (
        <div className="betCard">
            {`${bet.battle.players[0].playerName} vs ${bet.battle.players[1].playerName}`}
            Match status: {bet.battle.status}
            {showBtn && (
                <Button onHit={betSettle} disabled={loading}>
                    Settle Bet
                </Button>
            )}
        </div>
    );
};

export default BetCard;
