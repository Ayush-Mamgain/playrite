import React, { useEffect, useState } from 'react'
import { getUserStatus } from './apiServices/userServices';
import { loginUser, logoutUser } from './features/authSlice';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import { Route, Routes } from 'react-router-dom';
import { Home, Profile, Bets, Transactions, Matches} from './pages'
import NotFound from './pages/NotFound';

const App = () => {
    const dispatch = useDispatch();
    // const [error, setError] = useState(false); --> for server errors --> navigate to a special error page

    useEffect(() => {
        getUserStatus()
        .then(res => res.data)
        .then(userData => dispatch(loginUser(userData)))
        .catch(error =>  dispatch(logoutUser()))
    }, []);

    return <div className="app">
        <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/bets' element={<Bets />} />
                <Route path='/transactions' element={<Transactions />} />
                <Route path='/matches' element={<Matches />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        <Footer />
    </div>
}

export default App
