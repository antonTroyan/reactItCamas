import React, {useEffect} from 'react';
import s from './Dialogs.module.css';
import Message from './message/Message';
import AddMessageForm from './AddMessageForm';
import {reduxForm} from 'redux-form';
import Preloader from "../common/preloader/preloader";
import {InitialStateType, MessageType} from "../../redux/dialogs-reducer";

type OwnPropsType = {
    messages: Array<MessageType>
    downloadMessagesThunkCreator: (userIdFromUrl: string) => void
    onSendMessageClickThunkCreator: (userIdFromUrl: string, newMessageBody: string) => void
    match: any
}

export type MessageFormValuesType = {
    message : string
}


const MessagesList: React.FC<OwnPropsType> = (props) => {

    let userIdFromUrl = props.match.params.id

    useEffect(() => {
        props.downloadMessagesThunkCreator(userIdFromUrl)
    }, [userIdFromUrl]);

    const AddMessageFormRedux = reduxForm<MessageFormValuesType>({form: "dialogAddMessageForm"})(AddMessageForm);

    let addNewMessage = (values: any) => {
        props.onSendMessageClickThunkCreator(userIdFromUrl, values.message);
    }

    let messagesElements = props.messages.map((msg) => {
        let senderId = msg.senderId != null ? msg.senderId : '';
        return <Message message={msg.message}
                        isMyMessage={senderId.toString() !== userIdFromUrl}/>
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