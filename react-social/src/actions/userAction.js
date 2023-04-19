import {login, request, signup} from "../util/APIUtils";
import {LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS} from "./types";
import {ACCESS_TOKEN, API_BASE_URL} from "../constants";

const loginUser = (loginRequest, navigate) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_LOADING})
        const res = await login(loginRequest)

        localStorage.setItem(ACCESS_TOKEN, res.accessToken);

        const user = await request({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        })

        dispatch({
            type: LOGIN_SUCCESS,
            user
        })

        return navigate("/profile");
    } catch (e) {
        return dispatch({
            type: LOGIN_FAILURE,
            error: e
        })
    }
}

const signUserUp = (signUpRequest, navigate) => async (dispatch) => {
    try {
        dispatch({type: LOGIN_LOADING})
        await signup(signUpRequest)

        dispatch({
            type: SIGNUP_SUCCESS
        })

        return navigate("/login");
    } catch (e) {
        return dispatch({
            type: SIGNUP_FAILURE,
            error: e
        })
    }
}

const loadCurrentUser = () => async (dispatch) => {
    try {
        dispatch({type: LOGIN_LOADING})

        if(!localStorage.getItem(ACCESS_TOKEN)) {
            throw new Error('No access token set.');
        }

        const res = await request({
            url: API_BASE_URL + "/user/me",
            method: 'GET'
        })

        return dispatch({
            type: LOGIN_SUCCESS,
            user: res
        })
    } catch (e) {
        return dispatch({
            type: LOGIN_FAILURE,
        })
    }
}
const logoutUser = () => async (dispatch) => {
    localStorage.removeItem(ACCESS_TOKEN);
    dispatch({
        type: LOGOUT
    });
}

export {loginUser, signUserUp, logoutUser, loadCurrentUser}