import React from 'react';
import Users from "./Users";
import Preloader from "../common/preloader/preloader";

class UsersAPIComponent extends React.Component {

    componentDidMount() {
        this.props.getUsersThunkCreator(this.props.currentPage, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   onPageChanged={(pageNumber) => {this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);}}
                   users={this.props.users}
                   startFollow={(userId) => {this.props.followThunkCreator(userId);}}
                   stopFollow={(userId) => {this.props.unFollowThunkCreator(userId);}}
                   isFollowingInProgress={this.props.isFollowingInProgress}/>
        </>
    }
}

export default UsersAPIComponent;