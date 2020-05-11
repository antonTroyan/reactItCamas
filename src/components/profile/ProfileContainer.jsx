import React from 'react';
import { connect } from 'react-redux';
import ProfileAPIComponent from "./ProfileAPIComponent";
import {getUserProfileThunkCreator} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";



let mapStateToProps = (state) => {
    return {
        profile : state.profilePage.profile,
        isAuth  : state.authReducer.isAuth
    }
};

// wrapper that add info about url to ProfileAPIComponent
let WithUrlDataContainerComponent = withRouter(ProfileAPIComponent);

const ProfileContainer = connect(mapStateToProps, {

    getUserProfileThunkCreator : getUserProfileThunkCreator

})(WithUrlDataContainerComponent);

export default ProfileContainer