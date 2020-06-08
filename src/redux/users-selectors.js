import { createSelector } from "reselect";

// primitive selector
const getUsers = (state) => {
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

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
}

export const getFollowingProgress = (state) => {
    return state.usersPage.isFollowingInProgress;
}
