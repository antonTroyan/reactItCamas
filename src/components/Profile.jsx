import React from 'react';
import s from './Profile.module.css';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg' />
        </div>
        <div>
            ava + description
    </div>
        <div>
            my posts
        <div>new post</div>
            <div className={s.posts}>
                <div className={s.item}>post1</div>
                <div className={s.item}>post2</div>
            </div>
        </div>
    </div>
}

export default Profile;