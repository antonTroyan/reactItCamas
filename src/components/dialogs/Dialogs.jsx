import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {

    let dialogsData = [
        { id: 1, name: 'Dimich' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Ivan' },
        { id: 4, name: 'China' }
    ]

    let dialogsElements = dialogsData.map(element => <DialogItem name={element.name} id={element.id} />)

    let messagesData = [
        { id: 1, message: "hi" },
        { id: 1, message: "How are you" },
        { id: 1, message: "Yo" }
    ]

    let messagesElements = messagesData.map((msg) => {
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