import React from "react";
import Paginator from "../common/paginator/Paginator";
import User from "./User";


let Users = ({ currentPage, totalUsersCount, pageSize, onPageChanged, users, ...props }) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pages.push(pageNumber);
    }

    return <div>
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalItemsCount={totalUsersCount}
            pageSize={pageSize} />
        <div>
            {
                users.map(user => <User user={user}
                    key={user.id}
                    isFollowingInProgress={props.isFollowingInProgress}
                    startFollow={props.startFollow}
                    stopFollow={props.stopFollow} />)
            }
        </div>
    </div>
};


export default Users;