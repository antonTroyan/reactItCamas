import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';

const Profile = (props) => {
    debugger
    return (
        <div >
            <ProfileInfo />
            <MyPosts store={props.store}/>
        </div>
    )
};

export default Profile;