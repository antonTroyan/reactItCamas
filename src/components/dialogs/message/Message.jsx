import React from 'react';
import s from './../Dialogs.module.css';

const Message = (props) => {

    return (
        <div>
            {props.isMyMessage
                ? <div className={s.dialogMyMsg}>{props.message}</div>
                : <div className={s.dialogRecipientMsg}>{props.message}</div>
            }
        </div>
    )
};

export default Message;