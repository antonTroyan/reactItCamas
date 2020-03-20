import React from 'react';
import s from './Dialogs.module.css';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialogs + ' ' + s.active}>
                    Dimich
                </div>
                <div className={s.dialogs}>
                    Andrey
                </div>
                <div className={s.dialogs}>
                    Ivan
                </div>
                <div className={s.dialogs}>
                    Ivan
                </div>
                <div className={s.dialogs}>
                    Ivan
                </div>
                <div className={s.dialogs}>
                    Ivan
                </div>
                <div className={s.dialogs}>
                    Ivan
                </div>
                
            </div>
            <div className={s.messages}>
                <div className={s.dialog}>Hi</div>
                <div className={s.dialog}>How are you</div>
                <div className={s.dialog}>Yo</div>
            </div>
        </div>
    )
}

export default Dialogs;