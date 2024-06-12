import React from 'react'
import Logo from './Logo'
import UserLogo from './UserLogo'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from './Button'
import Wallet from './Wallet'

const Header = () => {
    const authStatus = useSelector((state) => state.auth.status)
    const walletAmount = useSelector((state) => state.userData.walletAmount)
    const navItems = [
        {
            name: 'login',
            active: !authStatus,
        },
        {
            name: 'register',
            active: !authStatus,
        },
    ]

    return (
        <nav className="header">
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
                                <Button>{item.name}</Button>
                            </li>
                        )
                )}
                {authStatus && <li>{<Wallet amount={walletAmount} />}</li>}
                {authStatus && <li>{<UserLogo />}</li>}
            </ul>
        </nav>
    )
}

export default Header
