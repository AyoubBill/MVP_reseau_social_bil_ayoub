import React, { useState, useEffect } from "react";
import { VscGlobe } from 'react-icons/vsc';
import AuthService from '../services/auth.service';
import { Link } from "react-router-dom";
import '../styles/Navbar.css';

const Navbar = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleLogOut = () => {
        AuthService.logout();
    };

    return (
        <>
            {
                !currentUser ? (
                    <div className="navbar" >
                        <Link className='active-link' to='/'>
                            <div className="navbar-picture"></div>
                        </Link>
                        <div>
                            <Link to="/login"> Login</Link>
                            <Link to="/register"> Register</Link>
                        </div>
                    </div >
                ) : (
                    <div className="navbar">
                        <Link className='active-link' to='/'>
                            <div className="navbar-picture"></div>
                        </Link>
                        <div>
                            <Link to='/'>{currentUser.username}</Link>
                            <Link to='/'> Home</Link>
                            <a href="/login" onClick={handleLogOut}> Logout</a>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Navbar