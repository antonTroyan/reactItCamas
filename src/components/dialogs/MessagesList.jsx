import React, {useEffect} from 'react';
import s from './Dialogs.module.css';
import Message from './message/Message';
import AddMessageForm from './AddMessageForm';
import {reduxForm} from 'redux-form';
import Preloader from "../common/preloader/preloader";

const MessagesList = (props) => {

    let userIdFromUrl = props.match.params.id

    useEffect(() => {
        props.downloadMessagesThunkCreator(userIdFromUrl)
    }, [userIdFromUrl]);

    const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm);

    let addNewMessage = (values) => {
        props.onSendMessageClickThunkCreator(userIdFromUrl, values.newMessageBody);
    }

    let messagesElements = props.messages.map((msg) => {

        return <Message message={msg.message}
                        isMyMessage={msg.userId.toString() !== userIdFromUrl}/>
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

export default MessagesList;