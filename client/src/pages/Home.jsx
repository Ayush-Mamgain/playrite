import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import Input from '../components/Input';

const Home = () => {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [inviteCode, setInviteCode] = useState('');

    return (
        <div className="home">

            <Button
                onHit={() => {
                    authStatus
                        ? navigate('/organizeMatch')
                        : toast.error('Please Login first');
                }}
            >
                Create Match
            </Button>

            <form
                onSubmit={() => {
                    if (authStatus) {
                        setInviteCode('');
                        navigate(`/placeBet/${inviteCode}`);
                    } else {
                        toast.error('Please login first');
                    }
                }}
            >
                <Input
                    value={inviteCode}
                    onMutate={(event) => setInviteCode(event.target.value)}
                    disabled={!authStatus}
                />
                <Button>Place Bet</Button>
            </form>
        </div>
    );
};

export default Home;
