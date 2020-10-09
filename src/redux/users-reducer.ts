import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {AppStateType, InferActionTypes} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";


let initialState = {
    users: [] as Array<UserType>,
    pageSize: 50,
    totalUsersCount: 40,
    currentPage: 1,
    isFetching: false,

    isFollowingInProgress: [] as Array<number> // array of users Ids
};

type InitialState = typeof initialState

export const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {

    // ts determine what object is in each case
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };

        case 'UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };

        case 'SET_USERS': {
            return {...state, users: action.users};
        }

        case 'SET_CURRENT_PAGE': {
            return {
                ...state,
                currentPage: action.pageNumber
            }
        }

        case 'SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalCount};
        }

        case 'SET_IS_FETCHING': {
            return {...state, isFetching: action.isFetchingValue};
        }

        case 'SET_FOLLOWING_PROGRESS': {
            return {
                ...state,
                isFollowingInProgress: action.isFollowingInProgressValue
                    ? [...state.isFollowingInProgress, action.userId]
                    : state.isFollowingInProgress.filter(id => id !== action.userId)
            };
        }

        default:
            return state;
    }
};

type ActionsTypes = InferActionTypes<typeof actions>

export const actions = {
    followActionCreator: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowActionCreator: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsersActionCreator: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setCurrentPageActionCreator: (pageNumber: number) => ({type: 'SET_CURRENT_PAGE', pageNumber} as const),
    setUsersTotalCountActionCreator: (totalCount: number) => ({type: 'SET_TOTAL_USERS_COUNT', totalCount} as const),
    setIsFetchingActionCreator: (isFetchingValue: boolean) => ({type: 'SET_IS_FETCHING', isFetchingValue} as const),
    setIsFollowingInProgressActionCreator: (isFollowingInProgressValue: boolean, userId: number) => ({
        type: 'SET_FOLLOWING_PROGRESS',
        isFollowingInProgressValue,
        userId
    } as const),
}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>


// special container that allow us to pass data to inner function [currentPage and pageSize]
// according to documentation the best way is to specify return value from thunk by special function [ThunkAction<>]
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {

    return async (dispatch) => {
        dispatch(actions.setCurrentPageActionCreator(currentPage));
        dispatch(actions.setIsFetchingActionCreator(true));

        let response = await usersAPI.getAllUsers(currentPage, pageSize);
        dispatch(actions.setIsFetchingActionCreator(false));
        dispatch(actions.setUsersActionCreator(response.items));
        dispatch(actions.setUsersTotalCountActionCreator(response.totalCount));
    }
};


export const followThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        let apiMethod = usersAPI.followSpecialUser.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, actions.followActionCreator);
    }
};

export const unFollowThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unFollowSpecialUser.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, actions.unfollowActionCreator);
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.setIsFollowingInProgressActionCreator(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.setIsFollowingInProgressActionCreator(false, userId));
}


export default usersReducer;