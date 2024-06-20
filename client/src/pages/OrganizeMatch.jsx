import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';
import { createMatch } from '../apiServices/matchServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OrganizeMatch = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        player1: '',
        player2: '',
        battleAmount: 0,
    });

    const changeHandler = (event) => {
        setFormData((formData) => {
            return {
                ...formData,
                [event.target.name]: event.target.value,
            };
        });
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const toastId = toast.loading('Creating Match...');
        createMatch({
            players: [formData.player1, formData.player2],
            battleAmount: formData.battleAmount,
        })
            .then((res) => {
                console.log(res);
                navigate(`/matchAdmin/${res.data._id}`);
                toast.success('Match created successfully');
            })
            .catch((error) => toast.error(error.message))
            .finally(() => {
                toast.dismiss(toastId);
            });
    };

    return (
        <div className="organizeMatch">
            <form onSubmit={submitHandler}>
                <Input
                    label="Player/team name"
                    name="player1"
                    onMutate={changeHandler}
                    value={formData.player1}
                />
                <Input
                    label="Player/team name"
                    name="player2"
                    onMutate={changeHandler}
                    value={formData.player2}
                />
                <Input
                    label="Bet Amount per team"
                    name="battleAmount"
                    onMutate={changeHandler}
                    value={formData.battleAmount}
                />
                <Button>Create Match</Button>
            </form>
        </div>
    );
};

export default OrganizeMatch;
