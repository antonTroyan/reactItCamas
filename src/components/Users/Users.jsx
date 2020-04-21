import React from 'react';
import styles from './users.module.css';


let Users = (props) => {

    if (props.users.length === 0) {
        props.setUsers(
            [
                { id: 1, photoUrl: 'https://vokrug.tv/pic/news/d/3/d/5/d3d530210cd546b48e3b7ca34559adb5.jpg', isFollowed: true, fullName: 'Dmitry', status: 'I am a boss', location: { city: 'Minsk', country: 'Belarus' } },
                { id: 2, photoUrl: 'https://vokrug.tv/pic/news/d/3/d/5/d3d530210cd546b48e3b7ca34559adb5.jpg', isFollowed: false, fullName: 'Anton', status: 'Looking for a job', location: { city: 'Rio', country: 'Unknown' } },
                { id: 3, photoUrl: 'https://vokrug.tv/pic/news/d/3/d/5/d3d530210cd546b48e3b7ca34559adb5.jpg', isFollowed: true, fullName: 'Elena', status: 'Have a cool girlfriend', location: { city: 'Minsk', country: 'Belarus' } },
                { id: 4, photoUrl: 'https://vokrug.tv/pic/news/d/3/d/5/d3d530210cd546b48e3b7ca34559adb5.jpg', isFollowed: true, fullName: 'Mike', status: 'See my new photo in inst', location: { city: 'Minsk', country: 'Belarus' } },
                { id: 5, photoUrl: 'https://vokrug.tv/pic/news/d/3/d/5/d3d530210cd546b48e3b7ca34559adb5.jpg', isFollowed: false, fullName: 'John', status: 'nia!', location: { city: 'Minsk', country: 'Belarus' } }
            ]
        )
    }

    return (
        <div>
            {
                props.users.map(user =>
                    <div key={user.id}>
                        <span>
                            <div>
                                <img src={user.photoUrl} className={styles.userPhoto} />
                            </div>
                        </span>
                        <span>
                            <div>
                                {user.isFollowed
                                    ? <button onClick={() => { props.unfollow(user.id) }}>Followed</button>
                                    : <button onClick={() => { props.follow(user.id) }}>Unfollowed</button>
                                }
                            </div>
                        </span>
                        <span>
                            <span>
                                <div>{user.fullName}<div>{user.status}</div></div>
                            </span>
                            <span>
                                <div>{user.location.country}<div>{user.location.city}</div></div>
                            </span>
                        </span>
                    </div>)
            }
        </div>
    )
};

export default Users;