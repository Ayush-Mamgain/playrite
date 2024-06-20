import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';

const NavMenu = ({ navMenuItems, setNavMenu }) => {
    const navigate = useNavigate();
    // const item = { --> structure for item
    //     id,
    //     name,
    //     path
    // }
    return (
        <div className="navMenu">
            <ul>
                {navMenuItems.map((item) => (
                    <li key={item.id || Date.now()} onClick={() => setNavMenu(false)}>
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NavMenu;
