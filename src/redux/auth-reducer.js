import {authApi, securityApi} from "../api/api";
import {stopSubmit} from 'redux-form';

const SET_USER_AUTH_DATA = 'social/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null - captcha entering is not required
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            }

        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                captchaUrl: action.captchaUrl
            }

        default:
            return state;
    }
};

export const setUserAuthDataActionCreator = (userId, email, login, isAuth) => ({
    type: SET_USER_AUTH_DATA,
    data: {
        userId: userId,
        email: email,
        login: login,
        isAuth: isAuth
    }
});

export const getUserDataThunkCreator = () => async (dispatch) => {

    // return data to check when dispatch will be done
    let response = await authApi.amIAuthorized();
    if (response.data.resultCode === 0) {
        let userId = response.data.data.id;
        let email = response.data.data.email;
        let login = response.data.data.login;

        dispatch(setUserAuthDataActionCreator(userId, email, login, true));
    }
};

export const loginThunkCreator = (email, password, rememberMe, captcha) => async (dispatch) => {

    let response = await authApi.login(email, password, rememberMe, captcha)

    if (response.data.resultCode === 0) {
        dispatch(getUserDataThunkCreator());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrlThunkCreator())
        }

        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Server does not return error message"

        // stopSubmit special option to highlight special field with special message
        // '_error' means form common error not special field
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const getCaptchaUrlSuccessActionCreator = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: captchaUrl
})

export const getCaptchaUrlThunkCreator = () => async (dispatch) => {

    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccessActionCreator(captchaUrl))
};

export const logoutThunkCreator = () => async (dispatch) => {

    let response = await authApi.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserAuthDataActionCreator(null, null, null, false));
    }
};

export default authReducer;