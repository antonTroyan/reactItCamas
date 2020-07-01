import React, {useEffect, useRef} from 'react';
import s from './Dialogs.module.css';
import Message from './message/Message';
import AddMessageForm from './AddMessageForm';
import {reduxForm} from 'redux-form';
import Preloader from "../common/preloader/preloader";

const MessagesListCool = (props) => {

    const mounted = useRef();
    useEffect(() => {
        if (!mounted.current) {
            props.downloadMessagesThunkCreator(props.match.params.id)
            mounted.current = true;
        }
    });

    const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

    let addNewMessage = (values) => {
        props.onSendMessageClick(values.newMessageBody);
    }

    let messagesElements = props.messages.map((msg) => {
        return <Message message={msg.message}/>
    });

    if (!props.messages) {
        return <Preloader/>
    }

    return (
        <div className={s.messages}>
            <div>{messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    )
};

export default MessagesListCool;