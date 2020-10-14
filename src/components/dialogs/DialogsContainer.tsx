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

let mapStateToProps = (state: AppStateType) => {
    return {
        messagesPage: state.dialogsReducer,
    }
};

// this function aggregate wrappers
export default compose(
    connect(mapStateToProps, {
        downloadFriendsThunkCreator: downloadFriendsThunkCreator,
        downloadMessagesThunkCreator: downloadMessagesThunkCreator,
        onSendMessageClickThunkCreator: onSendMessageClickThunkCreator
    }),
    withAuthRedirect
)(Dialogs);