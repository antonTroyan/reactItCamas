import React from 'react';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './MyPosts/ProfileInfo/ProfileInfo';

const Profile = (props) => {
    debugger
    return (
        <div >
            <ProfileInfo />
            <MyPosts profilePage={props.profilePage} dispatch={props.dispatch}/>
        </div>
    )
};

export default Profile;