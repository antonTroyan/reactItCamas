import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../../common/preloader/preloader";

const ProfileInfo = (props) => {
    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div>
            <div>
                <img src='https://image.shutterstock.com/image-photo/bright-spring-view-cameo-island-260nw-1048185397.jpg' />
            </div>
            <div className={s.descriptionBlock}>

                <img src={props.profile.photos.large}/>
                ava + description
            </div>
        </div>
    )
};

export default ProfileInfo;