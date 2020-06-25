import React from "react";
import styles from "./users.module.css";
import noAvatarPhoto from "../../assets/images/no-avatar.png";
import {NavLink} from "react-router-dom";

let User = ({user, stopFollow, startFollow, isFollowingInProgress}) => {

    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : noAvatarPhoto} alt=""
                             className={styles.userPhoto}/>
                    </NavLink>
                </div>
            </span>
            <span>
                <div>
                    {user.followed
                        ? <button onClick={() => {
                            stopFollow(user.id)
                        }}
                                  disabled={isFollowingInProgress.some(id => id === user.id)}
                        >Followed</button>

                        : <button onClick={() => {
                            startFollow(user.id)
                        }}
                                  disabled={isFollowingInProgress.some(id => id === user.id)}
                        >Unfollowed</button>
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


export default User;