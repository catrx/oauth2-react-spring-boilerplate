import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import './AppHeader.css';
import {useDispatch} from "react-redux";
import {logoutUser} from "../actions/userAction";

const AppHeader = (props) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        logoutUser()(dispatch);
    }

    return (
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/" className="app-title">Spring Social</Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        {props.authenticated ? (
                            <ul>
                                <li>
                                    <NavLink to="/profile">Profile</NavLink>
                                </li>
                                <li>
                                    <a onClick={handleLogout}>Logout</a>
                                </li>
                            </ul>
                        ) : (
                            <ul>
                                <li>
                                    <NavLink to="/login">Login</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/signup">Signup</NavLink>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;