import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {sendMessageCreator, updateNewMessageBodyActionCreator} from "../../redux/state";

const Dialogs = (props) => {

    let dialogsElements = props.dialogsData.map(element => <DialogItem name={element.name} id={element.id}/>)

    let messagesElements = props.messagesData.map((msg) => {
        return <Message message={msg.message}/>
    });

    let onNewMessageChange = (event) => {
        let msgText = event.target.value;
        props.dispatch(updateNewMessageBodyActionCreator(msgText));
    };

    let onSendMessageClick = () => {
        props.dispatch(sendMessageCreator());
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
                                  onChange={onNewMessageChange}>
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