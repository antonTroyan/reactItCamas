import {
    downloadFriendsThunkCreator,
    downloadMessagesThunkCreator,
    onSendMessageClickThunkCreator
} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import Dialogs from './Dialogs';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';
import {AppStateType} from "../../redux/redux-store";
import React from "react";

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.dialogsReducer,
    }
};

// this function aggregate wrappers
export default compose<React.ComponentType>(
    connect(mapStateToProps, {
        downloadFriendsThunkCreator: downloadFriendsThunkCreator,
        downloadMessagesThunkCreator: downloadMessagesThunkCreator,
        onSendMessageClickThunkCreator: onSendMessageClickThunkCreator
    }),
    withAuthRedirect
)(Dialogs);