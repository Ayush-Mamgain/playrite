import React from 'react';
import Button from './Button';
import { settleBet } from '../apiServices/betServices';
import toast from 'react-hot-toast';

const BetCard = ({ bet }) => {
    const [loading, setLoading] = useState(false);

    const betSettle = () => {
        setLoading(true);
        const toastId = toast.loading('Settling bet...');
        settleBet({ betId: bet._id })
            .then((res) => {
                console.log(res);
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
            {bet.status === 'active' && bet.battle.status === 'over' && (
                <Button onHit={betSettle} disabled={loading}>
                    Settle Bet
                </Button>
            )}
        </div>
    );
};

export default BetCard;
