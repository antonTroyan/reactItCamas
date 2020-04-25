import React from 'react';
import ProfileInfo from './myposts/profileInfo/ProfileInfo';
import MyPostsContainer from './myposts/MyPostContainer';

const Profile = (props) => {
    return (
        <div >
            <ProfileInfo />
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;