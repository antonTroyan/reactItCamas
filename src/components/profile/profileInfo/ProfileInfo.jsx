import React, {useState} from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/preloader/preloader";
import mainPic from "../../../assets/images/no-avatar.png";
import ProfileStatusHooks from './ProfileStatusHooks';
import ProfileDataForm from "./ProfileDataForm";
import ProfileMainData from "./ProfileMainData";

const ProfileInfo = ({profile, saveProfile, ...props}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length > 0) {
            props.savePhoto(e.target.files[0]);
        }
    }

    const onSubmit = (formData) => {
        // not the best approach
        // better hold info about success form submit in state
        saveProfile(formData).then(() => {
            setEditMode(false)
        })
    }

    return (
        <div>
            <div className={s.descriptionBlock}>

                <img alt="" src={profile.photos.large === null ? mainPic : profile.photos.large}
                     style={{width: 300, height: 300}}/><br/><br/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}

                {editMode
                    ? <ProfileDataForm initialValues={profile} profile={profile} onSubmit={onSubmit}/>
                    : <ProfileMainData profile={profile} isOwner={props.isOwner} goToEditMode={() => {
                        setEditMode(true)
                    }}/>
                }

                <ProfileStatusHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
};


export default ProfileInfo;