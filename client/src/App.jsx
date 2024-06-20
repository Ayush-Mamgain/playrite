import React, { useEffect, useState } from 'react';
import { getAllBanks, getUserStatus } from './apiServices/userServices';
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
import { setUser } from './features/profileSlice';
import { selectBank, setBank } from './features/bankSlice';
import OrganizeMatch from './pages/OrganizeMatch';
import MatchAdmin from './pages/MatchAdmin';
import PlaceBet from './pages/PlaceBet';

const App = () => {
    const dispatch = useDispatch();
    // const [error, setError] = useState(false); --> for server errors --> navigate to a special error page

    useEffect(() => {
        getUserStatus()
            .then((res) => {
                const user = res.data;
                dispatch(loginUser(user.token));
                dispatch(setBalance(user.wallet));
                dispatch(
                    setUser({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                        contact: user.contact,
                    })
                );
                dispatch(setBank(res.data.banks));
                dispatch(
                    selectBank(
                        res.data.banks.length != 0
                            ? res.data.banks[0]._id
                            : null
                    )
                );
            })
            .catch((error) => {
                dispatch(logoutUser());
            });
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
                <Route
                    path="/organizeMatch"
                    element={
                        <PrivateRoute>
                            <OrganizeMatch />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/matchAdmin/:matchId"
                    element={
                        <PrivateRoute>
                            <MatchAdmin />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/placeBet/:matchId"
                    element={
                        <PrivateRoute>
                            <PlaceBet />
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
