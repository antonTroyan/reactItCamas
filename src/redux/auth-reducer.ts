import {authApi, securityApi} from "../api/api";
import {stopSubmit} from 'redux-form';
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_USER_AUTH_DATA = 'social/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth/GET_CAPTCHA_URL_SUCCESS';

// Alternative way to declare type:
// let initialState = {
//     userId: null as number | null,
//     email: null as string | null,
//     login: null as string | null,
//     isAuth: false as boolean,
//     captchaUrl: null as string | null
// };
//
// type InitialStateType = typeOf initialState

type InitialStateType = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
    captchaUrl: { captchaUrl: string } | null
}

let initialState: InitialStateType = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null // if null - captcha entering is not required
};

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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

type ActionsTypes = SetUserAuthDataActionCreatorType | GetCaptchaUrlSuccessActionCreatorType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

type SetUserAuthDataActionCreatorDataType = {
    userId: number | null
    email: string | null
    login: string | null
    isAuth: boolean
}

type SetUserAuthDataActionCreatorType = {
    type: typeof SET_USER_AUTH_DATA,
    data: SetUserAuthDataActionCreatorDataType
}

export const setUserAuthDataActionCreator =
    (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetUserAuthDataActionCreatorType => ({

        type: SET_USER_AUTH_DATA,
        data: {
            userId: userId,
            email: email,
            login: login,
            isAuth: isAuth
        }
    });


export const getUserDataThunkCreator = (): ThunkType => async (dispatch) => {

    // return data to check when dispatch will be done
    let response = await authApi.amIAuthorized();
    if (response.data.resultCode === 0) {
        let userId = response.data.data.id;
        let email = response.data.data.email;
        let login = response.data.data.login;

        dispatch(setUserAuthDataActionCreator(userId, email, login, true));
    }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string) => async (dispatch: any) => {

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

type GetCaptchaUrlSuccessActionCreatorType = {
    type: typeof GET_CAPTCHA_URL_SUCCESS
    // means that we accept any object with key [captchaUrl] and string value
    captchaUrl: { captchaUrl: string }
}

export const getCaptchaUrlSuccessActionCreator = (captchaUrl: string): GetCaptchaUrlSuccessActionCreatorType => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl: {captchaUrl}
})

export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch) => {

    const response = await securityApi.getCaptchaUrl()
    const captchaUrl = response.data.url;

    dispatch(getCaptchaUrlSuccessActionCreator(captchaUrl))
};

export const logoutThunkCreator = () : ThunkType => async (dispatch) => {

    let response = await authApi.logout();

    if (response.data.resultCode === 0) {
        dispatch(setUserAuthDataActionCreator(null, null, null, false));
    }
};

export default authReducer;