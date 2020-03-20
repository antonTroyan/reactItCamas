import React from 'react';
import s from './Dialogs.module.css';
import { NavLink } from 'react-router-dom';

const Dialogs = (props) => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialogs + ' ' + s.active}>
                    <NavLink to="/dialogs/1">Dimich</NavLink>
                </div>
                <div className={s.dialogs}>
                    <NavLink to="/dialogs/2">Andrey</NavLink>
                </div>
                <div className={s.dialogs}>
                    <NavLink to="/dialogs/3">Ivan</NavLink>
                </div>
                <div className={s.dialogs}>
                    <NavLink to="/dialogs/4">China</NavLink>
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