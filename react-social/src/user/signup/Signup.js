import React, {useState} from 'react';
import {
    Navigate, useLocation, useNavigate,
} from "react-router-dom";
import './Signup.css';
import {Link} from 'react-router-dom'
import {GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL} from '../../constants';
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import githubLogo from '../../img/github-logo.png';
import {useDispatch, useSelector} from "react-redux";
import {signUserUp} from "../../actions/userAction";

const Signup = ({authenticated}) => {
    const location = useLocation();

    if (authenticated) {
        return <Navigate to='/profile' replace from={{ from: location }} />;
    }

    return (
        <div className="signup-container">
            <div className="signup-content">
                <h1 className="signup-title">Signup with SpringSocial</h1>
                <SocialSignup/>
                <div className="or-separator">
                    <span className="or-text">OR</span>
                </div>
                <SignupForm />
                <span className="login-link">Already have an account? <Link to="/login">Login!</Link></span>
            </div>
        </div>
    );
}


const SocialSignup = () => {
    return (
        <div className="social-signup">
            <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                <img src={googleLogo} alt="Google"/> Sign up with Google</a>
            <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                <img src={fbLogo} alt="Facebook"/> Sign up with Facebook</a>
            <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                <img src={githubLogo} alt="Github"/> Sign up with Github</a>
        </div>
    );
}

const SignupForm = () => {
    const { signUpError } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    let navigate = useNavigate();


    const [state, setState] = useState({
        name: '',
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

        const signUpRequest = Object.assign({}, state);

        signUserUp(signUpRequest, navigate)(dispatch)
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-item">
                <input type="text" name="name"
                       className="form-control" placeholder="Name"
                       value={state.name} onChange={handleInputChange} required/>
            </div>
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
            {signUpError && <div className="signup-error">{signUpError.message || signUpError.error || 'Oups une erreur est survenue'}</div>}
            <div className="form-item">
                <button type="submit" className="btn btn-block btn-primary">Sign Up</button>
            </div>
        </form>

    );
}

export default Signup