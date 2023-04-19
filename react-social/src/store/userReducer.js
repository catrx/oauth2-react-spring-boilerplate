import {LOGIN_FAILURE, LOGIN_LOADING, LOGIN_SUCCESS, LOGOUT, SIGNUP_FAILURE, SIGNUP_SUCCESS} from "../actions/types";

const initialState = {
    authenticated: false,
    currentUser: null,
    loading: false,
    loginError: null,
    signUpError: null
}
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_LOADING:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                loading: false,
                loginError: null,
                currentUser: action.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                authenticated: false,
                loading: false,
                currentUser: null,
                loginError: action.error
            }
        case LOGOUT:
            return {
                ...state,
                authenticated: false,
                currentUser: null
            }
        case SIGNUP_SUCCESS:
            return {
                ...state,
                authenticated: false,
                loading: false,
                signUpError: null,
                currentUser: null
            }
        case SIGNUP_FAILURE:
            return {
                ...state,
                authenticated: false,
                loading: false,
                currentUser: null,
                signUpError: action.error
            }
        default:
            return state
    }
}

export default userReducer;