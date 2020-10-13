import {ResultCodesEnum, ResultCodesWithCaptchaEnum} from "../api/api";
import {stopSubmit} from 'redux-form';
import { BaseThunkType, InferActionTypes} from "./redux-store";
import {authApi} from "../api/auth-api";
import {securityApi} from "../api/security-api";

const SET_USER_AUTH_DATA = 'social/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth/GET_CAPTCHA_URL_SUCCESS';

// Alternative way to declare type:
let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as null | { captchaUrl : string }
};

type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType <typeof stopSubmit>>

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

export const actions = {
    setUserAuthDataActionCreator : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
            type: SET_USER_AUTH_DATA,
            data: {userId: userId, email: email, login: login, isAuth: isAuth}
        } as const),

    getCaptchaUrlSuccessActionCreator : (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS,
        captchaUrl: {captchaUrl}
    } as const)
}

export const getUserDataThunkCreator = (): ThunkType => async (dispatch) => {
    // return data to check when dispatch will be done
    let meData = await authApi.amIAuthorized();
    if (meData.resultCode === 0) {
        let userId = meData.data.id;
        let email = meData.data.email;
        let login = meData.data.login;

        dispatch(actions.setUserAuthDataActionCreator(userId, email, login, true));
    }
};

export const loginThunkCreator = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    let loginData = await authApi.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        await dispatch(getUserDataThunkCreator());
    } else {
        if (loginData.resultCode === ResultCodesWithCaptchaEnum.CaptchaIsRequired) {
            await dispatch(getCaptchaUrlThunkCreator())
        }
        let message = loginData.messages.length > 0 ? loginData.messages[0] : "Server does not return error message"
        // stopSubmit special option to highlight special field with special message
        // '_error' means form common error not special field
        dispatch(stopSubmit("login", {_error: message}));
    }
};


export const getCaptchaUrlThunkCreator = (): ThunkType => async (dispatch) => {
    const data = await securityApi.getCaptchaUrl()
    const captchaUrl = data.url;
    dispatch(actions.getCaptchaUrlSuccessActionCreator(captchaUrl))
};

export const logoutThunkCreator = (): ThunkType => async (dispatch) => {
    let response = await authApi.logout();
    if (response.data.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setUserAuthDataActionCreator(null, null, null, false));
    }
};

export default authReducer;