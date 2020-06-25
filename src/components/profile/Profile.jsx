import React from 'react';
import ProfileInfo from './profileInfo/ProfileInfo';
import MyPostsContainer from './myposts/MyPostContainer';

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo profile={props.profile}
                         isOwner={props.isOwner}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         savePhoto={props.savePhoto}/>
            <MyPostsContainer/>
        </div>
    )
};

export default Profile;