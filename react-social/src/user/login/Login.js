import React, {useEffect, useState} from 'react';
import './Login.css';
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN} from '../../constants';
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../actions/userAction";
import {enqueueSnackbar} from "notistack";

const Login = ({authenticated}) => {
    let location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.error) {
            setTimeout(() => {
                enqueueSnackbar(location.state.error, {variant: 'error'})
                navigate(location.pathname, {replace: true});
            }, 100);
        }
    }, [])

    if (authenticated) {
        return <Navigate to='/profile' replace state={{ from: location }} />
    }

    return (
        <div className="login-container">
            <div className="login-content">
                <h1 className="login-title">Login to SpringSocial</h1>
                <SocialLogin/>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <LoginForm navigate={navigate}/>
                <span className="signup-link">New user? <Link to="/signup">Sign up!</Link></span>
            </div>
        </div>
    );
}

const SocialLogin = () => {
    return (
        <div className="social-login">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/> Log in with Google</a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                <img src={fbLogo} alt="Facebook"/> Log in with Facebook</a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                <img src={githubLogo} alt="Github"/> Log in with Github</a>
        </div>
    );
}


const LoginForm = ({navigate}) => {
    const { loginError } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (event) => {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        setState({
            ...state,
            [inputName]: inputValue
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const loginRequest = Object.assign({}, state);

        loginUser(loginRequest, navigate)(dispatch);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="email" name="email"
                       className="form-control" placeholder="Email"
                       value={state.email} onChange={handleInputChange} required/>
            </div>
            <div className="form-item">
                <input type="password" name="password"
                       className="form-control" placeholder="Password"
                       value={state.password} onChange={handleInputChange} required/>
            </div>
            {loginError && <div className="login-error">{loginError.message || loginError.error || 'Oups une erreur est survenue'}</div>}
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Login</button>
            </div>
        </form>
    );
}

export default Login
