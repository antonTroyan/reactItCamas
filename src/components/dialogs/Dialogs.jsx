import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import Message from './message/Message';
import {Redirect} from 'react-router-dom';
import AddMessageForm from './AddMessageForm';
import {reduxForm} from 'redux-form';


const Dialogs = (props) => {

    let dialogsElements = props.messagesPage
        .dialogs
        .map(element => <DialogItem name={element.name} id={element.id}/>)

    let messagesElements = props.messagesPage
        .messages.map((msg) => {
            return <Message message={msg.message}/>
        });

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>;
    }

    let addNewMessage = (values) => {
        props.onSendMessageClick(values.newMessageBody);
    }

    const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
        </div>
    )
};

export default Dialogs;