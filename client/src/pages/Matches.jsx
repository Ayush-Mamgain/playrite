import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { getAllMatches } from '../apiServices/userServices';

const Matches = () => {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const toastId = toast.loading('Loading...');
        getAllMatches()
            .then((res) => {
                console.log(res);
                setMatches(res.data);
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    }, []);

    return (
        <div className="matches">
            <ul>
                {matches?.map((match) => (
                    <li key={match._id}>
                        <Link to={`/matchAdmin/${match._id}`}>
                            {match.players[0].playerName}v/s
                            {match.players[1].playerName}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Matches;
