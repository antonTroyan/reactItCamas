import {connect} from 'react-redux';
import UsersAPIComponent, {MapDispatchPropsType, MapStatePropsType, OwnPropsType} from './UsersAPIComponent';
import {
    getUsersThunkCreator, followThunkCreator, unFollowThunkCreator
} from '../../redux/users-reducer';
import {compose} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {
    getUsersSelector,
    getPageSize,
    getTotalUsersCount,
    getCurrentPage,
    getIsFetching,
    getFollowingProgress
} from '../../redux/users-selectors';
import {AppStateType} from "../../redux/redux-store";
import React from "react";


let mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {
        users: getUsersSelector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingInProgress: getFollowingProgress(state)
    }
};

// Here we specify all out types of props
export default compose<React.ComponentType>(connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
    {
        getUsersThunkCreator: getUsersThunkCreator,
        followThunkCreator: followThunkCreator,
        unFollowThunkCreator: unFollowThunkCreator
    }),
    withAuthRedirect)(UsersAPIComponent);