import {getUserDataThunkCreator} from "./auth-reducer";
import {InferActionTypes} from "./redux-store";

let initialState = {
    isAppInitialized: false,
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actions>

// [:InitialStateType] means type of return value
export const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case 'social/app/SET_INITIALIZED_TRUE':
            return {
                ...state,
                isAppInitialized: true
            };

        default:
            return state;
    }
};

export const actions = {
    setInitializedTrueActionCreator: () => ({type: 'social/app/SET_INITIALIZED_TRUE'} as const)
}

export const initializeAppThunkCreator = () => {

    return async (dispatch: any) => {
        let promise = dispatch(getUserDataThunkCreator());
        // set initialized to true only when amIAuthorized will be completed
        promise.then(() => {
            dispatch(actions.setInitializedTrueActionCreator());
        })
    }
};


export default appReducer;