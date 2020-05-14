import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';

//HOC
let authRedirectComponent = withAuthRedirect(Dialogs);

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

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(authRedirectComponent);

export default DialogsContainer;