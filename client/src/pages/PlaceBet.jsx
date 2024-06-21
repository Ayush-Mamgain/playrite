import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMatchDetails } from '../apiServices/matchServices';
import toast from 'react-hot-toast';
import Input from '../components/Input';
import { placeBet } from '../apiServices/betServices';
import Button from '../components/Button';
import { useDispatch } from 'react-redux';
import { decrementBalance } from '../features/walletSlice';

const PlaceBet = () => {
    const dispatch = useDispatch();

    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [formData, setFormData] = useState({
        selectedPlayer: '',
        betAmount: 0,
    });

    useEffect(() => {
        const toastId = toast.loading('Loading...');
        console.log(matchId);
        getMatchDetails(matchId)
            .then((res) => {
                console.log(res);
                setMatchData(res.data);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    }, [matchId]);

    const submitHandler = (event) => {
        event.preventDefault();
        const toastId = toast.loading('Placing bet...');
        placeBet({
            battleId: matchId,
            playerId: formData.selectedPlayer,
            betAmount: formData.betAmount
        })
            .then((res) => {
                console.log(res);
                toast.success('Bet placed successfully');
                dispatch(decrementBalance(formData.betAmount));
                setFormData({
                    selectedPlayer: '',
                    betAmount: 0,
                });
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    };

    if (matchData?.status === 'over') return <div>Match already over</div>;
    return (
        <div className="placeBet">
            <span>Match status: {matchData?.status}</span>
            {matchData?.status === 'inactive' && (
                <form onSubmit={submitHandler}>
                    <ul>
                        {matchData?.players.map((player) => (
                            <li key={player._id}>
                                <Input
                                    type="radio"
                                    label={player.playerName}
                                    checked={player._id === formData.selectedPlayer}
                                    onChange={() =>
                                        setFormData(formData => {
                                            return {
                                                ...formData,
                                                selectedPlayer: player._id
                                            }
                                        })
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                    <Input
                        type="number"
                        label="Bet Amount"
                        disabled={!formData.selectedPlayer}
                        value={formData.betAmount}
                        onMutate={(event) =>
                            setFormData((formData) => {
                                return {
                                    ...formData,
                                    betAmount: event.target.value,
                                };
                            })
                        }
                    />
                    <Button>Place Bet</Button>
                </form>
            )}
        </div>
    );
};

export default PlaceBet;
