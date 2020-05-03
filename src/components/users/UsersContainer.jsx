import React from 'react';
import { connect } from 'react-redux';
import UsersAPIComponent from './UsersAPIComponent';
import {
    followActionCreator,
    unfollowActionCreator,
    setUsersActionCreator,
    setCurrentPageActionCreator, setUsersTotalCountActionCreator, setIsFetchingActionCreator
} from '../../redux/users-reducer';

let mapStateToProps = (state) => {
    return {
        users           : state.usersPage.users,
        pageSize        : state.usersPage.pageSize,
        totalUsersCount : state.usersPage.totalUsersCount,
        currentPage     : state.usersPage.currentPage,
        isFetching      : state.usersPage.isFetching
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) => {
            dispatch(followActionCreator(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowActionCreator(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersActionCreator(users));
        },
        setCurrentPage : (pageNumber) => {
            dispatch(setCurrentPageActionCreator(pageNumber))
        },
        setTotalUsersCount : (totalCount) => {
            dispatch(setUsersTotalCountActionCreator(totalCount))
        },
        setIsFetching : (isFetchingValue) => {
            dispatch(setIsFetchingActionCreator(isFetchingValue))
        }
    }
};

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(UsersAPIComponent);

export default UsersContainer