import React from 'react';
import { connect } from 'react-redux';
import ProfileAPIComponent from "./ProfileAPIComponent";
import {getUserProfileThunkCreator} from "../../redux/profile-reducer";
import {withRouter} from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

//HOC
let AuthRedirectComponent = withAuthRedirect(ProfileAPIComponent);

let mapStateToProps = (state) => {
    return {
        profile : state.profilePage.profile,
    }
};

// wrapper that add info about url to ProfileAPIComponent
let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

const ProfileContainer = connect(mapStateToProps, {

    getUserProfileThunkCreator : getUserProfileThunkCreator

})(WithUrlDataContainerComponent);

export default ProfileContainer