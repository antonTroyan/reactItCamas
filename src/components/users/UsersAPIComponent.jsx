import React from 'react';
import * as axios from "axios";
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

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged}
                   users={this.props.users}
                   follow={this.props.follow}
                   unfollow={this.props.unfollow}/>
        </>
    }
}

export default UsersAPIComponent;