import { connect } from 'react-redux';
import UsersAPIComponent from './UsersAPIComponent';
import {
    followActionCreator,
    unfollowActionCreator,
    setUsersActionCreator,
    setCurrentPageActionCreator,
    setUsersTotalCountActionCreator,
    setIsFetchingActionCreator,
    setIsFollowingInProgressActionCreator, getUsersThunkCreator, followThunkCreator, unFollowThunkCreator
} from '../../redux/users-reducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,

        isFollowingInProgress: state.usersPage.isFollowingInProgress
    }
};


export default compose(
    
    connect(mapStateToProps, {

        follow: followActionCreator,
        unfollow: unfollowActionCreator,
        setUsers: setUsersActionCreator,
        setCurrentPage: setCurrentPageActionCreator,
        setTotalUsersCount: setUsersTotalCountActionCreator,
        setIsFetching: setIsFetchingActionCreator,

        setIsFollowingInProgress: setIsFollowingInProgressActionCreator,
        getUsersThunkCreator: getUsersThunkCreator,
        followThunkCreator: followThunkCreator,
        unFollowThunkCreator: unFollowThunkCreator

    }),

    withAuthRedirect

)(UsersAPIComponent);