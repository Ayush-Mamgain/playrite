import React, { useEffect } from 'react'
import { login } from './api/authServices'
import { getUserInfo, logout, getAllBets, getAllTransactions } from './api/userServices';
import axios from 'axios';
const App = () => {
    useEffect(() => {
        (async () => {
            await login({
                email: 'ayushmamgain1234@gmail.com',
                password: 'password',
            }).then((res) => console.log(res));
        })();
    }, []);

    const logoutHandler = async() => {
        await logout()
        .then(res => console.log(res));
    }

    const userHandler = async () => {
        await getAllBets()
        .then(res => console.log(res));
        await getAllTransactions()
        .then(res => console.log(res));
    }

    return (
        <div className='app'>
            <button onClick={logoutHandler}>Logout</button>
            <button onClick={userHandler}>User</button>
        </div>
    )
}

export default App
