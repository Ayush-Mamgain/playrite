import React from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
    const authStatus = useSelector(state => state.auth.status);
    
    return (
        <div className='home'>
            
        </div>
    );
}

export default Home;
