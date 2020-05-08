import {authApi} from "../api/api";

const SET_USER_AUTH_DATA = 'SET_USER_AUTH_DATA';


let initialState = {
    userId : null,
    email  : null,
    login  : null,
    isAuth : false,
};

export const authReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };

        default:
            return state;
    }
};

export const setUserAuthDataActionCreator = (userId, email, login) => ({type: SET_USER_AUTH_DATA,
    data : {
        userId : userId,
        email : email,
        login : login
    }
});

export const getUserDataThunkCreator = () => (dispatch) => {
    authApi.authorizeMe().then(response => {
        if (response.data.resultCode === 0){
            let userId = response.data.data.id;
            let email  = response.data.data.email;
            let login  = response.data.data.login;

            dispatch(setUserAuthDataActionCreator(userId, email, login));
        }
    });
};

export default authReducer;