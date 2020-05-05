import React from "react";
import styles from "./users.module.css";
import noAvatarPhoto from "../../assets/images/no-avatar.png";
import {NavLink} from "react-router-dom";
import * as axios from "axios";

let Users = (props) => {

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
        pages.push(pageNumber);
    }

    return (
        <div>
            <div>
                {pages.map(pageNumber => {
                    return (
                        <span className={props.currentPage === pageNumber && styles.selectedPage}
                              onClick={(e) => {
                                  props.onPageChanged(pageNumber)
                              }}>
                            {pageNumber}
                        </span>
                    )
                })}
            </div>

            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <NavLink to={'/profile/' + user.id}>
                                    <img src={user.photos.small != null ? user.photos.small : noAvatarPhoto}
                                         className={styles.userPhoto}/>
                                </NavLink>
                            </div>
                        </span>
                        <span>
                            <div>
                                {user.followed ? <button onClick={() => {
                                        axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "148c700a-9ca0-485a-a9ff-5c4af60c5ecb"
                                            }

                                        }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.unfollow(user.id)
                                            }
                                        });
                                    }}>Followed</button> : <button onClick={() => {
                                        // post request have with credentials as 3 parameter
                                        axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${user.id}`, {}, {
                                            withCredentials: true,
                                            headers: {
                                                "API-KEY": "148c700a-9ca0-485a-a9ff-5c4af60c5ecb"
                                            }

                                        }).then(response => {
                                            if (response.data.resultCode === 0) {
                                                props.follow(user.id)
                                            }
                                        });
                                    }}>Unfollowed</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.name}</div>
                                <div>{user.status}</div>
                            </span>
                        </span>
                    </div>
                )
            }
        </div>
    )
};


export default Users;