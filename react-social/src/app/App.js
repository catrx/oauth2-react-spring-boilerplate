import React, {useEffect} from 'react';
import {
    Route, Routes
} from 'react-router-dom';
import Home from '../home/Home';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler';
import NotFound from '../common/NotFound';
import LoadingIndicator from '../common/LoadingIndicator';
import './App.css';
import AppHeader from "../common/AppHeader";
import PrivateRoute from "../common/PrivateRoute";
import {useDispatch, useSelector} from "react-redux";
import {loadCurrentUser} from "../actions/userAction";
import {SnackbarProvider} from "notistack";

const App = () => {
    const dispatch = useDispatch();
    const { authenticated, currentUser, loading } = useSelector(state => state.userReducer);


    useEffect(() => {
        loadCurrentUser()(dispatch);
    }, []);


    if (loading) {
        return <LoadingIndicator/>
    }

    return (
        <div className="app">
            <div className="app-top-box">
                <AppHeader authenticated={authenticated} />
            </div>
            <div className="app-body">
                <Routes>
                    <Route path="/" element={<Home authenticated={authenticated} />}/>
                    <Route path="/profile"
                           element={<PrivateRoute currentUser={currentUser}
                                                  authenticated={authenticated}><Profile
                               currentUser={currentUser}/></PrivateRoute>}/>
                    <Route path="/login"
                           element={<Login authenticated={authenticated}/>}/>
                    <Route path="/signup"
                           element={<Signup authenticated={authenticated}/>}/>
                    <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler/>}/>
                    <Route element={<NotFound/>}/>
                </Routes>
                <SnackbarProvider />
            </div>
        </div>
    );
}

export default App;
