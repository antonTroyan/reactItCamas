import {usersAPI} from "../api/api";
import {updateObjectInArray} from "../utils/objects-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_FOLLOWING_PROGRESS = 'SET_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 50,
    totalUsersCount: 40,
    currentPage: 1,
    isFetching: false,

    isFollowingInProgress: []
};

export const usersReducer = (state = initialState, action) => {

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

export const followActionCreator = (userId) => ({type: FOLLOW, userId});
export const unfollowActionCreator = (userId) => ({type: UNFOLLOW, userId});
export const setUsersActionCreator = (users) => ({type: SET_USERS, users});
export const setCurrentPageActionCreator = (pageNumber) => ({type: SET_CURRENT_PAGE, pageNumber});
export const setUsersTotalCountActionCreator = (totalCount) => ({type: SET_TOTAL_USERS_COUNT, totalCount});
export const setIsFetchingActionCreator = (isFetchingValue) => ({type: SET_IS_FETCHING, isFetchingValue});
export const setIsFollowingInProgressActionCreator = (isFollowingInProgressValue, userId) => ({
    type: SET_FOLLOWING_PROGRESS,
    isFollowingInProgressValue, userId
});


// special container that allow us to pass data to inner function [currentPage and pageSize]
export const getUsersThunkCreator = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(setCurrentPageActionCreator(currentPage));
        dispatch(setIsFetchingActionCreator(true));

        let response = await usersAPI.getAllUsers(currentPage, pageSize);
        dispatch(setIsFetchingActionCreator(false));
        dispatch(setUsersActionCreator(response.items));
        dispatch(setUsersTotalCountActionCreator(response.totalCount));
    }
};


export const followThunkCreator = (userId) => {

    return async (dispatch) => {
        let apiMethod = usersAPI.followSpecialUser.bind(usersAPI);
        followUnfollowFlow(dispatch, userId, apiMethod, followActionCreator);
    }
};

export const unFollowThunkCreator = (userId) => {

    return async (dispatch) => {
        let apiMethod = usersAPI.unFollowSpecialUser.bind(usersAPI);
        followUnfollowFlow(dispatch, userId, apiMethod, unfollowActionCreator);
    }
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(setIsFollowingInProgressActionCreator(true, userId))
    let response = await apiMethod(userId);
    if (response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(setIsFollowingInProgressActionCreator(false, userId));
}


export default usersReducer;