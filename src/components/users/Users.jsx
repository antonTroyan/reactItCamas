import React from 'react';
import styles from './users.module.css';
import * as axios from "axios";
import noAvatarPhoto from '../../assets/images/no-avatar.png';

class Users extends React.Component {

    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
                this.props.setTotalUsersCount(response.data.totalCount);
            });
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber);

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items);
            });
    };

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let pageNumber = 1; pageNumber <= pagesCount; pageNumber++) {
            pages.push(pageNumber);
        }

        return (

            <div>
                <div>
                    {pages.map(pageNumber => {
                        return (
                            <span className={this.props.currentPage === pageNumber && styles.selectedPage}
                                  onClick={ (e)=>{this.onPageChanged(pageNumber)} }>
                            {pageNumber}
                        </span>
                        )
                    })}
                </div>

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