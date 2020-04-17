import React from 'react';
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

const DialogsContainer = () => {

    return <StoreContext.Consumer>
        {
        (store) => {

            let onNewMessageChange = (event) => {
                let msgText = event.target.value;
                store.dispatch(updateNewMessageBodyActionCreator(msgText));
            };

            let onSendMessageClick = (event) => {
                store.dispatch(sendMessageActionCreator());
            };

            return <Dialogs messagesPage={store.getState().messagesPage} 
                onNewMessageChange={onNewMessageChange}
                onSendMessageClick={onSendMessageClick} 
                newMessageBody={store.getState().messagesPage.newMessageBody}/>
        }
    }
    </StoreContext.Consumer>

};

export default DialogsContainer;