import {downloadFriendsThunkCreator} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';
import Dialogs from './Dialogs';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

let mapStateToProps = (state) => {
    return {
        messagesPage: state.dialogsReducer,
    }
};


// let mapDispatchToProps = (dispatch) => {
//     return {
//         onSendMessageClick: (newMessageBody) => {
//             dispatch(sendMessageActionCreator(newMessageBody));
//         },
//     }
// };

// this function aggregate wrappers
export default compose(
    connect(mapStateToProps, {
        downloadFriendsThunkCreator: downloadFriendsThunkCreator
    }),
    withAuthRedirect
)(Dialogs);