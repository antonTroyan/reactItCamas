import {getUserDataThunkCreator} from "./auth-reducer";

const SET_INITIALIZED_TRUE = 'social/app/SET_INITIALIZED_TRUE';

// Types ////////////////////////////
type InitialStateType = {
    isAppInitialized: boolean
}
type InitializedTrueActionType = {
    type: typeof SET_INITIALIZED_TRUE
}
// Types ///////////////////////////


let initialState: InitialStateType = {
    isAppInitialized: false,
};


// [:InitialStateType] means type of return value
export const appReducer = (state = initialState, action: any): InitialStateType => {

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

export const setInitializedTrueActionCreator = (): InitializedTrueActionType => ({type: SET_INITIALIZED_TRUE});

export const initializeAppThunkCreator = () => (dispatch: any) => {

    let promise = dispatch(getUserDataThunkCreator());

    // set initialized to true only when isIAuthorized will be completed
    promise.then(() => {
        dispatch(setInitializedTrueActionCreator());
    })
};


export default appReducer;