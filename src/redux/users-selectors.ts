import {createSelector} from "reselect";
import {AppStateType} from "./redux-store";

// primitive selector
const getUsers = (state: AppStateType) => {
    return state.usersPage.users;
}

// 1 parameter of createSelector() is a simple function providing data, and 
// say what part of state must be watched by library. [on what selector we depends on]
// 2 parameter function that will handle data.
// Using this library we will not call render if users state will not be changed, 
// despite we return new object when filter is done.
export const getUsersSelector = createSelector(getUsers, (users) => {
    // fake filtration for demo purpose
    return users.filter(user => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
}

export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.isFollowingInProgress;
}