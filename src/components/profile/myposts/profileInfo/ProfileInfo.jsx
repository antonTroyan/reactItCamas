import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/preloader";

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }
    debugger

    return (
        <div>
            <div>
                <img src='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg' />
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                <div>About me -  {props.profile.aboutMe}</div>
                <div>Facebook -  {props.profile.contacts.facebook}</div>
                <div>WebSite  -  {props.profile.contacts.website}</div>
                <div>Vk       -  {props.profile.contacts.vk}</div>
                <div>Twitter  -  {props.profile.contacts.twitter}</div>
                <div>Instagram-  {props.profile.contacts.instagram}</div>
                <div>Youtube  -  {props.profile.contacts.youtube}</div>
                <div>GitHub   -  {props.profile.contacts.github}</div>

                <div>Looking for a job - {props.profile.lookingForAJob}</div>
                <div>Looking for a job desc - {props.profile.lookingForAJobDescription}</div>
            </div>
        </div>
    )
};

export default ProfileInfo;