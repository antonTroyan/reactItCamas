import React from 'react';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostContainer';

const Profile = (props) => {
    debugger
    return (
        <div >
            <ProfileInfo />
            <MyPostsContainer store={props.store}/>
        </div>
    )
};

export default Profile;