import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";

const Header = (props) => {

    return  <header className={s.header}>
                <img src='https://i.pinimg.com/236x/19/25/b7/1925b72b3e8d8df8fa22b6bff9052642.jpg'/>
                <div className={s.loginBlock}>
                    {props.isAuth ? props.login : <NavLink to={'/login'}>Login</NavLink>}
                </div>
            </header> 
};

export default Header;