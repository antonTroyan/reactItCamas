import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";
import {UserType} from "../types/types";
import {AppStateType} from "./redux-store";
import {ThunkAction} from "redux-thunk";
import {Dispatch} from "redux";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';

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
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
            };

        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };

        case SET_USERS: {
            return {...state, users: action.users};
        }

        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.pageNumber
            }
        }

        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalCount};
        }

        case SET_IS_FETCHING: {
            return {...state, isFetching: action.isFetchingValue};
        }

        case SET_FOLLOWING_PROGRESS: {
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

type ActionsTypes = FollowActionCreatorType | UnfollowActionCreatorType | SetUsersActionCreatorType
    | SetCurrentPageActionCreatorType | SetUsersTotalCountActionCreatorType | SetIsFetchingActionCreatorType
    | SetIsFollowingInProgressActionCreatorType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type GetStateType = () => AppStateType;
type DispatchType = Dispatch<ActionsTypes>


type FollowActionCreatorType = {
    type: typeof FOLLOW
    userId: number
}
export const followActionCreator = (userId: number): FollowActionCreatorType => ({type: FOLLOW, userId});


type UnfollowActionCreatorType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowActionCreator = (userId: number): UnfollowActionCreatorType => ({type: UNFOLLOW, userId});


type SetUsersActionCreatorType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsersActionCreator = (users: Array<UserType>): SetUsersActionCreatorType => ({type: SET_USERS, users});


type SetCurrentPageActionCreatorType = {
    type: typeof SET_CURRENT_PAGE
    pageNumber: number
}
export const setCurrentPageActionCreator = (pageNumber: number): SetCurrentPageActionCreatorType => ({
    type: SET_CURRENT_PAGE,
    pageNumber
});


type SetUsersTotalCountActionCreatorType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}
export const setUsersTotalCountActionCreator = (totalCount: number): SetUsersTotalCountActionCreatorType => ({
    type: SET_TOTAL_USERS_COUNT,
    totalCount
});


type SetIsFetchingActionCreatorType = {
    type: typeof SET_IS_FETCHING
    isFetchingValue: boolean
}
export const setIsFetchingActionCreator = (isFetchingValue: boolean): SetIsFetchingActionCreatorType => ({
    type: SET_IS_FETCHING,
    isFetchingValue
});


type SetIsFollowingInProgressActionCreatorType = {
    type: typeof SET_FOLLOWING_PROGRESS
    isFollowingInProgressValue: boolean
    userId: number
}
export const setIsFollowingInProgressActionCreator = (isFollowingInProgressValue: boolean, userId: number): SetIsFollowingInProgressActionCreatorType => ({
    type: SET_FOLLOWING_PROGRESS,
    isFollowingInProgressValue,
    userId
});

// special container that allow us to pass data to inner function [currentPage and pageSize]
// according to documentation the best way is to specify return value from thunk by special function [ThunkAction<>]
export const getUsersThunkCreator = (currentPage: number, pageSize: number): ThunkType => {

    return async (dispatch) => {
        dispatch(setCurrentPageActionCreator(currentPage));
        dispatch(setIsFetchingActionCreator(true));

        let response = await usersAPI.getAllUsers(currentPage, pageSize);
        dispatch(setIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(response.items));
        dispatch(setUsersTotalCountActionCreator(response.totalCount));
    }
};


export const followThunkCreator = (userId: number): ThunkType => {

    return async (dispatch) => {

        let apiMethod = usersAPI.followSpecialUser.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, followActionCreator);
    }
};

export const unFollowThunkCreator = (userId: number): ThunkType => {

    return async (dispatch: any) => {
        let apiMethod = usersAPI.unFollowSpecialUser.bind(usersAPI);
        _followUnfollowFlow(dispatch, userId, apiMethod, unfollowActionCreator);
    }
};

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   userId: number,
                                   apiMethod: any,
                                   actionCreator: (userId: number) => FollowActionCreatorType | UnfollowActionCreatorType) => {

    dispatch(setIsFollowingInProgressActionCreator(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setIsFollowingInProgressActionCreator(false, userId));
}


export default usersReducer;