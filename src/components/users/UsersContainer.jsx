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
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingProgress } from '../../redux/users-selectors';


let mapStateToProps = (state) => {
    return {
        users           : getUsers(state),
        pageSize        : getPageSize(state),
        totalUsersCount : getTotalUsersCount(state),
        currentPage     : getCurrentPage(state),
        isFetching      : getIsFetching(state),

        isFollowingInProgress: getFollowingProgress(state)
    }
};


export default compose(

    connect(mapStateToProps, {
        follow             : followActionCreator,
        unfollow           : unfollowActionCreator,
        setUsers           : setUsersActionCreator,
        setCurrentPage     : setCurrentPageActionCreator,
        setTotalUsersCount : setUsersTotalCountActionCreator,
        setIsFetching      : setIsFetchingActionCreator,

        setIsFollowingInProgress : setIsFollowingInProgressActionCreator,
        getUsersThunkCreator     : getUsersThunkCreator,
        followThunkCreator       : followThunkCreator,
        unFollowThunkCreator     : unFollowThunkCreator
    }),

    withAuthRedirect

)(UsersAPIComponent);