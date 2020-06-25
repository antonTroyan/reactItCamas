import {getUserDataThunkCreator} from "./auth-reducer";

const SET_INITIALIZED_TRUE = 'social/app/SET_INITIALIZED_TRUE';

let initialState = {
    isAppInitialized: false,
};

export const appReducer = (state = initialState, action) => {

    switch (action.type) {

        case SET_INITIALIZED_TRUE:
            return {
                ...state,
                isAppInitialized: true
            };

        default:
            return state;
    }
};

export const setInitializedTrueActionCreator = () => ({type: SET_INITIALIZED_TRUE});

export const initializeAppThunkCreator = () => (dispatch) => {

    let promise = dispatch(getUserDataThunkCreator());

    // set initialized to true only when isIAuthorized will be completed
    promise.then(() => {
        dispatch(setInitializedTrueActionCreator());
    })
};


export default appReducer;