import React from 'react';
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import {usersAPI} from "../../api/api";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.setIsFetching(true);
        usersAPI.getAllUsers(this.props.currentPage, this.props.pageSize)
            .then(response => {
                this.props.setUsers(response.items);
                this.props.setTotalUsersCount(response.totalCount);
                this.props.setIsFetching(false);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.setIsFetching(true);
        usersAPI.getAllUsers(pageNumber, this.props.pageSize)
            .then(response => {
                this.props.setUsers(response.items);
                this.props.setIsFetching(false);
            });
    };

    startFollow = (userId) => {
        this.props.setIsFollowingInProgress(true, userId);
        usersAPI.followSpecialUser(userId).then(response => {
            if (response.resultCode === 0) {
                this.props.follow(userId)
            }
        });
        this.props.setIsFollowingInProgress(false, userId);
    };

    stopFollow = (userId) => {
        this.props.setIsFollowingInProgress(true, userId);
        usersAPI.unFollowSpecialUser(userId).then(response => {
            if (response.resultCode === 0) {
                this.props.unfollow(userId)
            }
        });
        this.props.setIsFollowingInProgress(false, userId);
    };

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   startFollow={this.startFollow}
                   stopFollow={this.stopFollow}
                   isFollowingInProgress={this.props.isFollowingInProgress}/>
        </>
    }
}

export default UsersAPIComponent;