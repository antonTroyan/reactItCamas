import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsElements = props.dialogsData.map(element => <DialogItem name={element.name} id={element.id} />)

    let messagesElements = props.messagesData.map((msg) => {
        return <Message message={msg.message} />
    })

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                { messagesElements }
            </div>
        </div>
    )
}

export default Dialogs;