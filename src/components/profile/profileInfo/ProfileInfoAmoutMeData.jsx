import React from "react";
import s from './ProfileInfo.module.css';

const ProfileData = ({profile, isOwner, goToEditMode}) => {
    return (
        <div>
            {isOwner && <button onClick={goToEditMode}>Edit</button>}

            <div>Name - {profile.fullName}</div>
            <br/>
            <div><b>About me - {profile.aboutMe}</b></div>
            <div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}
            </div>
            <br/>
            <div>Looking for a job - {profile.lookingForAJob}</div>
            <div>Looking for a job desc - {profile.lookingForAJobDescription}</div>
        </div>
    )
}

const Contact = ({contactTitle, contactValue}) => {
    return <div className={s.contact}>{contactTitle} : {contactValue}</div>
}

export default ProfileData
