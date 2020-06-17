import { authApi } from "../api/api";
import { stopSubmit } from 'redux-form';

const SET_USER_AUTH_DATA = 'social/auth/SET_USER_AUTH_DATA';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            };

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

export const loginThunkCreator = (email, password, rememberMe) => async (dispatch) => {

    let response = await authApi.login(email, password, rememberMe)

    if (response.data.resultCode === 0) {
        dispatch(getUserDataThunkCreator());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Server does not return error message"

        // stopSubmit special option to highlight special field with special message
        // '_error' means form common error not special field
        dispatch(stopSubmit("login", { _error: message }));
    }
};

export const logoutThunkCreator = () => async (dispatch) => {

    let response = await authApi.logout();
    
    if (response.data.resultCode === 0) {
        dispatch(setUserAuthDataActionCreator(null, null, null, false));
    }
};

export default authReducer;