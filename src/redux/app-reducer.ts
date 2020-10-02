import {getUserDataThunkCreator} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED_TRUE = 'social/app/SET_INITIALIZED_TRUE';

type InitialStateType = {
    isAppInitialized: boolean
}


let initialState: InitialStateType = {
    isAppInitialized: false,
};


// [:InitialStateType] means type of return value
export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

type ActionsTypes = InitializedTrueActionType

type InitializedTrueActionType = {
    type: typeof SET_INITIALIZED_TRUE
}

export const setInitializedTrueActionCreator = (): InitializedTrueActionType => ({type: SET_INITIALIZED_TRUE});

// [Another declaration way]
// export const initializeAppThunkCreator = () : ThunkType => (dispatch) => {
//
//     let promise = dispatch(getUserDataThunkCreator());
//     // set initialized to true only when amIAuthorized will be completed
//     promise.then(() => {
//         dispatch(setInitializedTrueActionCreator());
//     })
// };

export const initializeAppThunkCreator = () : ThunkType => {

    return async (dispatch) => {
        let promise = dispatch(getUserDataThunkCreator());
        // set initialized to true only when amIAuthorized will be completed
        promise.then(() => {
            dispatch(setInitializedTrueActionCreator());
        })
    }
};


export default appReducer;