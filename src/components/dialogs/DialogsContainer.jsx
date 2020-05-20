import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

let mapStateToProps = (state) => {
    return {
        messagesPage   : state.messagesPage,
        newMessageBody : state.messagesPage.newMessageBody,
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: (event) => {
            dispatch(updateNewMessageBodyActionCreator(event.target.value));
        },
        onSendMessageClick: () => {
            dispatch(sendMessageActionCreator());
        }
    }
};

// this function agregate wrappers
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs);