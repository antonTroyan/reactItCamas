import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Message from './message/Message';
import { Redirect } from 'react-router-dom';

const Dialogs = (props) => {

    let dialogsElements = props.messagesPage
        .dialogs
        .map(element => <DialogItem name={element.name} id={element.id} />)

    let messagesElements = props.messagesPage
        .messages.map((msg) => {
            return <Message message={msg.message} />
        });

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>;
    }     

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
                            onChange={props.onNewMessageChange}
                            value={props.newMessageBody}>
                        </textarea>
                    </div>
                    <div>
                        <button onClick={props.onSendMessageClick}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dialogs;