import React from 'react';
import { connect } from 'react-redux';
import HeaderApiComponent from "./HeaderApiComponent";
import {setUserAuthDataActionCreator} from "../../redux/auth-reducer";


let mapStateToProps = (state) => {
    return {
        isAuth : state.authReducer.isAuth,
        login : state.authReducer.login
    }
};

const HeaderContainer = connect(mapStateToProps, {
    setUserAuthData : setUserAuthDataActionCreator
})(HeaderApiComponent);

export default HeaderContainer