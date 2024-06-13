import React, { useState } from 'react';
import Logo from './Logo';
import UserLogo from './UserLogo';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from './Button';
import Wallet from './Wallet';
import NavMenu from './NavMenu';
import CrossLogo from './CrossLogo';
import { logoutUser } from '../features/authSlice';
import { logout } from '../apiServices/userServices';
import toast from 'react-hot-toast';
import Modal from './Modal';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';
import TransactionModal from './TransactionModal';

const Header = () => {
    const dispatch = useDispatch();

    const auth = useSelector((state) => state.auth);
    const authStatus = auth.status;
    const walletAmount = authStatus ? auth.userData.walletAmount : 0;

    const [navMenu, setNavMenu] = useState(false);

    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showTransaction, setShowTransaction] = useState(false);

    const navItems = [
        {
            name: 'login',
            active: !authStatus,
            onClick: function () {
                setShowLogin(true);
            }
        },
        {
            name: 'register',
            active: !authStatus,
            onClick: function () {
                setShowRegister(true);
            }
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

    const handleLogout = () => {
        const toastId = toast.loading('Loading...');
        logout()
            .then((res) => {
                console.log(res);
                toast.success('Logout successful');
                dispatch(logoutUser());
            })
            .catch((error) => toast.error(error.message))
            .finally(() => toast.dismiss(toastId));
    }

    return (
        <div className='header'>
            <nav className="navbar">
                <div className="logoWrapper">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <ul>
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <li key={item.name}>
                                    <Button onHit={item.onClick}>{item.name}</Button>
                                </li>
                            )
                    )}
                    {authStatus && (
                        <li>{<Wallet walletAmount={walletAmount} onHit={() => setShowTransaction(true)}/>}</li>
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
                <Button type="button" onHit={handleLogout}>
                    Logout
                </Button>
            </nav>

            <Modal show={showLogin} handleClose={() => setShowLogin(false)}>
                <LoginModal setShowLogin={setShowLogin}/>
            </Modal>
            <Modal show={showRegister} handleClose={() => setShowRegister(false)}>
                <RegisterModal setShowRegister={setShowRegister}/>
            </Modal>
            <Modal show={showTransaction} handleClose={() => setShowTransaction(false)}>
                <TransactionModal walletAmount={walletAmount} setShowTransaction={setShowTransaction}/>
            </Modal>
        </div>
    );
};

export default Header;
