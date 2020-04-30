import React from 'react';
import styles from './users.module.css';
import * as axios from "axios";
import noAvatarPhoto from '../../assets/images/no-avatar.png';

class Users extends React.Component {

    constructor(props) {
        super(props);

        if (this.props.users.length === 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users")
                .then(response => {
                    this.props.setUsers(response.data.items);
                });
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.users.map(user =>
                        <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photos.small != null ? user.photos.small : noAvatarPhoto}
                                     className={styles.userPhoto}/>
                            </div>
                        </span>
                            <span>
                            <div>
                                {user.isFollowed
                                    ? <button onClick={() => {
                                        this.props.unfollow(user.id)
                                    }}>Followed</button>
                                    : <button onClick={() => {
                                        this.props.follow(user.id)
                                    }}>Unfollowed</button>
                                }
                            </div>
                        </span>
                            <span>
                            <span>
                                <div>{user.name}
                                    <div>{user.status}</div></div>
                            </span>
                                {/*<span>*/}
                                {/*    <div>{user.location.country}*/}
                                {/*    <div>{user.location.city}*/}
                                {/*    </div>*/}
                                {/*    </div>*/}
                                {/*</span>*/}
                        </span>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Users;