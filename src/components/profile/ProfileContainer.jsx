import { connect } from 'react-redux';
import ProfileAPIComponent from "./ProfileAPIComponent";
import {
    getUserProfileThunkCreator,
    getUsersStatusThunkCreator,
    updateUserStatusThunkCreator
} from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


let mapStateToProps = (state) => {
    return {
        profile          : state.profilePage.profile,
        status           : state.profilePage.status,
        authorizedUserId : state.authReducer.userId,
        isAuth           : state.authReducer.isAuth
    }
};


// this function aggregates wrappers
export default compose(
    connect(mapStateToProps, {
        getUserProfileThunkCreator   : getUserProfileThunkCreator,
        getUserStatusThunkCreator    : getUsersStatusThunkCreator,
        updateUserStatusThunkCreator : updateUserStatusThunkCreator
    }),
    // wrapper that add info about url to ProfileAPIComponent
    withRouter,
    //HOC
    withAuthRedirect
)(ProfileAPIComponent);