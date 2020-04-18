import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import Dialogs from './Dialogs';


let mapStateToProps = (state) => {
    return {
        messagesPage: state.messagesPage,
        newMessageBody: state.messagesPage.newMessageBody
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        onNewMessageChange: (event) => {
            dispatch(updateNewMessageBodyActionCreator(event.target.value));
        },
        onSendMessageClick: () => {
            dispatch(sendMessageActionCreator());
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;