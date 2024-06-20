import React, { useEffect, useState } from 'react';
import Logo from './Logo';
import UserLogo from './UserLogo';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import Wallet from './Wallet';
import NavMenu from './NavMenu';
import CrossLogo from './CrossLogo';
import {
    setShowLogin,
    setShowRegister,
    setShowTransaction,
} from '../features/modalSlice';
import LogoutBtn from './LogoutBtn';
import HeaderModals from './HeaderModals';
import { getAllBanks } from '../apiServices/userServices';
import { selectBank, setBank } from '../features/bankSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);

    const [navMenu, setNavMenu] = useState(false);

    const navItems = [
        {
            name: 'login',
            active: !authStatus,
            onClick: function () {
                dispatch(setShowLogin(true));
            },
        },
        {
            name: 'register',
            active: !authStatus,
            onClick: function () {
                dispatch(setShowRegister(true));
            },
        },
    ];

    const navMenuItems = [
        {
            id: 1,
            name: 'My Profile',
            path: '/profile',
        },
        {
            id: 2,
            name: 'My Bets',
            path: '/bets',
        },
        {
            id: 3,
            name: 'Transactions',
            path: '/transactions',
        },
        {
            id: 4,
            name: 'My Matches',
            path: '/matches',
        },
    ];

    return (
        <div className="header">
            <nav className="navbar">
                <div className="logoWrapper">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <ul>
                    {authStatus && (
                        <li>
                            {
                                <Wallet
                                    onHit={() =>
                                        dispatch(setShowTransaction(true))
                                    }
                                />
                            }
                        </li>
                    )}
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <li key={item.name}>
                                    <Button onHit={item.onClick}>
                                        {item.name}
                                    </Button>
                                </li>
                            )
                    )}
                    {authStatus && (
                        <li>
                            {navMenu ? (
                                <CrossLogo onHit={() => setNavMenu(false)} />
                            ) : (
                                <UserLogo onHit={() => setNavMenu(true)} />
                            )}
                        </li>
                    )}
                </ul>
                {navMenu && <NavMenu navMenuItems={navMenuItems} />}
                <LogoutBtn />
            </nav>

            <HeaderModals />
        </div>
    );
};

export default Header;
