import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import mainPic from "../../../assets/images/no-avatar.png";
import ProfileStatus from "./ProfileStatus"

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                <img alt="" src={props.profile.photos.large === null ? mainPic : props.profile.photos.large}
                     style={{width:300, height:300}}/><br/><br/>

                <div>Name -  {props.profile.fullName}</div><br/>

                <div>About me -  {props.profile.aboutMe}</div>
                <div>Facebook -  {props.profile.contacts.facebook}</div>
                <div>WebSite  -  {props.profile.contacts.website}</div>
                <div>Vk       -  {props.profile.contacts.vk}</div>
                <div>Twitter  -  {props.profile.contacts.twitter}</div>
                <div>Instagram-  {props.profile.contacts.instagram}</div>
                <div>Youtube  -  {props.profile.contacts.youtube}</div>
                <div>GitHub   -  {props.profile.contacts.github}</div><br/>

                <div>Looking for a job - {props.profile.lookingForAJob}</div>
                <div>Looking for a job desc - {props.profile.lookingForAJobDescription}</div>
            
            
                <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};

export default ProfileInfo;