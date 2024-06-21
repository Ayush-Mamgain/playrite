import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    finishMatch,
    getMatchDetails,
    startMatch,
} from '../apiServices/matchServices';
import Button from '../components/Button';
import Input from '../components/Input';
import toast from 'react-hot-toast';

const MatchAdmin = () => {
    const navigate = useNavigate();

    const { matchId } = useParams();
    const [matchData, setMatchData] = useState(null);
    const [result, setResult] = useState(null);
    const [matchStarted, setMatchStarted] = useState(false);

    useEffect(() => {
        console.log(matchId);
        const toastId = toast.loading('Loading...');
        getMatchDetails(matchId)
            .then((res) => {
                console.log(res);
                setMatchData(res.data);
                setMatchStarted(res.data.status === 'active')
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    }, [matchId]);

    const matchStart = () => {
        const toastId = toast.loading('Starting match...');
        startMatch({ battleId: matchId })
            .then((res) => {
                console.log(res);
                setMatchStarted(true);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    };

    const matchFinish = () => {
        finishMatch({
            battleId: matchId,
            result,
        }).then((res) => {
            console.log(res);
            navigate('/');
        });
    };

    const matchHandler = () => {
        if (!matchStarted) {
            matchStart();
        } else {
            matchFinish();
        }
    };

    if (!matchData || matchData.status === 'over') {
        return <div>Match already over</div>;
    }
    return (
        <div className="matchAdmin">
            <Input label="Invite Code" disabled={true} value={matchData._id} />
            <ul>
                {matchData.players.map((player) => (
                    <li key={player._id}>
                        <Input
                            type="radio"
                            onChange={() => setResult(player._id)}
                            label={player.playerName}
                            checked={result === player._id}
                            disabled = {!matchStarted}
                        />
                    </li>
                ))}
                <li>
                    <Input
                        type="radio"
                        onChange={() => setResult(null)}
                        label="Draw"
                        checked={result === null}
                        disabled = {!matchStarted}
                    />
                </li>
            </ul>
            <Button onHit={matchHandler}>
                {matchStarted ? 'Finish Match' : 'Start Match'}
            </Button>
        </div>
    );
};

export default MatchAdmin;
