import React, { useEffect } from 'react'
import { login } from './api/authServices'
import { getUserInfo, logout, getAllBets, getAllTransactions, getUserStatus } from './api/userServices';
import { loginUser, logoutUser } from './features/authSlice';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(false); --> for server errors --> navigate to a special error page

    useEffect(() => {
        getUserStatus()
        .then(res => res.data)
        .then(userData => {
            if(userData) {
                dispatch(loginUser(userData));
                console.log(userData);
            } else {
                dispatch(logoutUser());
            }
        })
        .finally(() => setLoading(false));
    }, []);

    const testHandler = async (event) => {
        //test the APIs here
        await login({
            email: 'ayushmamgain1234@gmail.com',
            password: 'password'
        })
        .then(res => console.log(res));
    }
    
    return (
        <div className='app'>
            <button onClick={testHandler}>TEST</button>
        </div>
    )
}

export default App
