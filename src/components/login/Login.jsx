import React from 'react';
import LoginForm from './LoginForm';
import {reduxForm} from 'redux-form';
import {loginThunkCreator} from "../../redux/auth-reducer"
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';


// requesting HOC from redux-form library to wrap login form
const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

// {loginThunkCreator, isAuth} destructualization instead of passing props
const Login = ({loginThunkCreator, isAuth}) => {

    const onSubmit = (formData) => {
        loginThunkCreator(formData.email, formData.password, formData.rememberMe)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

const mapStateToProps = (state) => ({
    isAuth: state.authReducer.isAuth
})

export default connect(mapStateToProps, {
    loginThunkCreator: loginThunkCreator
})(Login);