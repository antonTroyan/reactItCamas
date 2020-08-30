import React from 'react';
import Users from "./Users";
import Preloader from "../common/preloader/preloader";
import {UserType} from "../../types/types";


export type MapStatePropsType = {
    currentPage: number
    pageSize: number
    isFetching : boolean
    totalUsersCount: number
    users: Array<UserType>
    isFollowingInProgress: Array<number>
}

export type MapDispatchPropsType = {
    followThunkCreator: (userId: number) => void
    unFollowThunkCreator: (userId: number) => void
    getUsersThunkCreator: (currentPage: number, pageSize: number) => void
}

// we have 3 different types of props
// 1 - state props
// 2 - callbacks[dispatch] props
// 3 - own props declared directly [<UsersContainer pageTitle={"Samurai"}/>]
export type OwnPropsType = {
    pageTitle : string
}

// combine props
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


class UsersAPIComponent extends React.Component<PropsType> {

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsersThunkCreator(currentPage, pageSize);
    }

    render() {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={(pageNumber) => {
                       this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
                   }}
                   users={this.props.users}
                   startFollow={(userId: number) => {
                       this.props.followThunkCreator(userId);
                   }}
                   stopFollow={(userId: number) => {
                       this.props.unFollowThunkCreator(userId);
                   }}
                   isFollowingInProgress={this.props.isFollowingInProgress}/>
        </>
    }
}

export default UsersAPIComponent;