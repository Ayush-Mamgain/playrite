import React, { useEffect, useState } from 'react'
import { getUserStatus } from './apiServices/userServices';
import { loginUser, logoutUser } from './features/authSlice';
import { useDispatch } from 'react-redux';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal'

const App = () => {
    const dispatch = useDispatch();
    // const [error, setError] = useState(false); --> for server errors --> navigate to a special error page

    useEffect(() => {
        getUserStatus()
        .then(res => res.data)
        .then(userData => {
            if(userData) {
                dispatch(loginUser(userData));
            } else {
                dispatch(logoutUser());
            }
        })
        // .finally(() => setLoading(false));
    }, []);

    return <div className="app">
        <RegisterModal />
    </div>
}

export default App
