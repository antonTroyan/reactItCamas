import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import mainPic from "../../../assets/images/no-avatar.png";
import ProfileStatusHooks from './ProfileStatusHooks';

const ProfileInfo = ({profile, ...props}) => {
    if (!profile){
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                <img alt="" src={profile.photos.large === null ? mainPic : profile.photos.large}
                     style={{width:300, height:300}}/><br/><br/>

                <div>Name -  {profile.fullName}</div><br/>

                <div>About me -  {profile.aboutMe}</div>
                <div>Facebook -  {profile.contacts.facebook}</div>
                <div>WebSite  -  {profile.contacts.website}</div>
                <div>Vk       -  {profile.contacts.vk}</div>
                <div>Twitter  -  {profile.contacts.twitter}</div>
                <div>Instagram-  {profile.contacts.instagram}</div>
                <div>Youtube  -  {profile.contacts.youtube}</div>
                <div>GitHub   -  {profile.contacts.github}</div><br/>

                <div>Looking for a job - {profile.lookingForAJob}</div>
                <div>Looking for a job desc - {profile.lookingForAJobDescription}</div>
            
            
                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;