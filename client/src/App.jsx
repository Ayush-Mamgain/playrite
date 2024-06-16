import React, { useEffect, useState } from 'react';
import { getUserStatus } from './apiServices/userServices';
import { loginUser, logoutUser } from './features/authSlice';
import { useDispatch } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import OpenRoute from './components/OpenRoute';
import { Route, Routes } from 'react-router-dom';
import { Home, Profile, Bets, Transactions, Matches } from './pages';
import NotFound from './pages/NotFound';
import { setBalance } from './features/walletSlice';

const App = () => {
    const dispatch = useDispatch();
    // const [error, setError] = useState(false); --> for server errors --> navigate to a special error page

    useEffect(() => {
        getUserStatus()
            .then((res) => {
                dispatch(loginUser(res?.data?.token));
                dispatch(setBalance(res?.data?.wallet));
            })
            .catch((error) => dispatch(logoutUser()));
    }, []);

    return (
        <div className="app">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/bets"
                    element={
                        <PrivateRoute>
                            <Bets />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/transactions"
                    element={
                        <PrivateRoute>
                            <Transactions />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/matches"
                    element={
                        <PrivateRoute>
                            <Matches />
                        </PrivateRoute>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;
