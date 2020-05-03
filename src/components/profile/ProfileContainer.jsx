import React from 'react';
import { connect } from 'react-redux';
import ProfileAPIComponent from "./ProfileAPIComponent";
import {setUserProfileActionCreator} from "../../redux/profile-reducer";



let mapStateToProps = (state) => {
    return {
        profile : state.profilePage.profile
    }
};

const ProfileContainer = connect(mapStateToProps, {

    setUserProfile : setUserProfileActionCreator

})(ProfileAPIComponent);

export default ProfileContainer