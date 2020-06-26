import React from "react";
import s from './ProfileInfo.module.css';

import {createField, InputCustomWrapper, TextAreaCustomWrapper} from "../../common/FormsControls/FormsControls";
import {reduxForm} from "redux-form";
import style from "../../common/FormsControls/FormControls.module.css";

const ProfileDataForm = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit}>
            <button>Save</button>

            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <b>Full name</b>: {createField("Full name", "fullName", TextAreaCustomWrapper, [])}
            </div>
            <div>
                <b>Looking for a job</b>:
                {createField("", "lookingForAJob", InputCustomWrapper, [], "checkbox")}
            </div>
            <div>
                <b>My professional skills</b>:
                {createField("My professional skills", "lookingForAJobDescription", TextAreaCustomWrapper, [])}
            </div>
            <div>
                <b>About me</b>:
                {createField("AboutMe", "aboutMe", TextAreaCustomWrapper, [])}
            </div>
            <div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {
                return <div className={s.contact}>
                    {/* ["contacts." + key] this value we will place all keys into contacts object inside form*/}
                    <b>{key} :  {createField(key, "contacts." + key, TextAreaCustomWrapper, [])}</b>
                </div>
            })}
            </div>
        </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form : 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm