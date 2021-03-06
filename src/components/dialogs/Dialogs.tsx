import React, {useEffect, useRef} from 'react';
import s from './Dialogs.module.css';
import DialogItem from './dialogItem/DialogItem';
import {Redirect, Route} from 'react-router-dom';
import Preloader from "../common/preloader/preloader";
import MessagesList from "./MessagesList";
import {InitialStateType} from "../../redux/dialogs-reducer";

type OwnPropsType = {
    messagesPage: InitialStateType
    downloadFriendsThunkCreator: () => void
    isAuth: () => void
    downloadMessagesThunkCreator: () => void
    onSendMessageClickThunkCreator: () => void
}

const Dialogs: React.FC<OwnPropsType> = (props) => {

    const mounted = useRef<boolean>();
    useEffect(() => {
        if (!mounted.current) {
            props.downloadFriendsThunkCreator()
            mounted.current = true;
        }
    });

    let dialogsElements = props.messagesPage
        .dialogs
        .map(element => <DialogItem name={element.name} id={element.id}/>)

    if (!props.isAuth) {
        return <Redirect to={"/login"}/>;
    }

    if (!props.messagesPage.dialogs) {
        return <Preloader/>
    }

    const messagesToProps = props.messagesPage.messages
    const downloadMessagesToProps = props.downloadMessagesThunkCreator
    const onSendMessageClickThunkCreator = props.onSendMessageClickThunkCreator

    return (
        <div className={s.dialogs}>

            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>

            <Route path='/dialogs/:id/messages'
                   render={(props) => <MessagesList {...props}
                                                    messages={messagesToProps}
                                                    downloadMessagesThunkCreator={downloadMessagesToProps}
                                                    onSendMessageClickThunkCreator={onSendMessageClickThunkCreator}/>}/>
        </div>
    )
};

export default Dialogs;