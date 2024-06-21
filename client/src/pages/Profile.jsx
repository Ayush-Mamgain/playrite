import React, { useEffect, useState } from 'react';
import { getUserStats } from '../apiServices/userServices';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
    const [userStats, setUserStats] = useState(null);
    const user = useSelector(state => state.profile.user);

    useEffect(() => {
        const toastId = toast.loading('Loading...');
        getUserStats()
        .then(res => {
            console.log(res);
            setUserStats(res.data);
        })
        .catch(error => toast.error(error.message))
        .finally(() => toast.dismiss(toastId));
    }, []);

    return (
        <div className='profile'>
            {user.username}
            {userStats?.netProfit} {/* This optional access is very necessary when displaying data through state variables*/}
        </div>
    );
}

export default Profile;
