import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAllBets } from '../apiServices/userServices';
import toast from 'react-hot-toast';
import BetCard from '../components/BetCard';

const Bets = () => {
    const [bets, setBets] = useState([]);
    const userId = useSelector((state) => state.auth.userData._id);

    useEffect(() => {
        console.log('User id:\n', userId);
        getAllBets()
            .then((res) => {
                console.log(res);
                toast.success('All bets fetched successfully');
                setBets(res.data);
            })
            .catch((error) => toast.error(error.message));
    }, []);

    return (
        <div className="bets">
            <ul>
                {bets.map((bet) => (
                    <li key={bet._id}>
                        <BetCard bet={bet} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Bets;
