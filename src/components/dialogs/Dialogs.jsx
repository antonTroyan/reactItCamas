import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { sendMessageActionCreator, updateNewMessageBodyActionCreator } from '../../redux/dialogs-reducer';

const Dialogs = (props) => {

    let dialogsElements = props.state.messagesPage
        .dialogs
        .map(element => <DialogItem name={element.name} id={element.id} />)

    let messagesElements = props.state.messagesPage
        .messages.map((msg) => {
            return <Message message={msg.message} />
        });

    let onNewMessageChange = (event) => {
        let msgText = event.target.value;
        props.dispatch(updateNewMessageBodyActionCreator(msgText));
    };

    let onSendMessageClick = (event) => {
        props.dispatch(sendMessageActionCreator());
    };

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <div>
                    <div>
                        <textarea placeholder="Enter your message"
                            onChange={onNewMessageChange}
                            value={props.state.messagesPage.newMessageBody}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;