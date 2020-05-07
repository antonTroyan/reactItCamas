import React from 'react';
import { connect } from 'react-redux';
import UsersAPIComponent from './UsersAPIComponent';
import {
    followActionCreator,
    unfollowActionCreator,
    setUsersActionCreator,
    setCurrentPageActionCreator,
    setUsersTotalCountActionCreator,
    setIsFetchingActionCreator,
    setIsFollowingInProgressActionCreator
} from '../../redux/users-reducer';

let mapStateToProps = (state) => {
    return {
        users           : state.usersPage.users,
        pageSize        : state.usersPage.pageSize,
        totalUsersCount : state.usersPage.totalUsersCount,
        currentPage     : state.usersPage.currentPage,
        isFetching      : state.usersPage.isFetching,

        isFollowingInProgress : state.usersPage.isFollowingInProgress
    }
};

const UsersContainer = connect(mapStateToProps, {

    follow             : followActionCreator,
    unfollow           : unfollowActionCreator,
    setUsers           : setUsersActionCreator,
    setCurrentPage     : setCurrentPageActionCreator,
    setTotalUsersCount : setUsersTotalCountActionCreator,
    setIsFetching      : setIsFetchingActionCreator,

    setIsFollowingInProgress : setIsFollowingInProgressActionCreator

})(UsersAPIComponent);

export default UsersContainer