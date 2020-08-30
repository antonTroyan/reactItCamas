import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type PropsType = {
    currentPage: number
    totalUsersCount: number
    pageSize: number
    onPageChanged: (pageNumber: number) => void
    users: Array<UserType>
    isFollowingInProgress: Array<number>
    startFollow: (userId: number) => void
    stopFollow: (userId: number) => void
}

let Users: React.FC<PropsType> = ({currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props}) => {

    return <div>
        <Paginator currentPageNumber={currentPage}
                   onPageChanged={onPageChanged}
                   totalItemsCount={totalUsersCount}
                   pageSize={pageSize}/>
        <div>
            {
                users.map(user => <User user={user}
                                        key={user.id}
                                        isFollowingInProgress={props.isFollowingInProgress}
                                        startFollow={props.startFollow}
                                        stopFollow={props.stopFollow}/>)
            }
        </div>
    </div>
};


export default Users;