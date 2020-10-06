import React from 'react';
import LoginForm from './LoginForm';
import {reduxForm} from 'redux-form';
import {loginThunkCreator} from "../../redux/auth-reducer"
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";


// requesting HOC from redux-form library to wrap login form
const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnPropsType>({form: 'login'})(LoginForm);


type MapStateToPropsType = {
    captchaUrl : string | null | undefined
    isAuth : boolean
}

type MapDispatchToPropsType = {
    loginThunkCreator: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}

export type LoginFormValuesType = {
    email : string
    password : string
    rememberMe : boolean
    captcha : string
}

export type LoginFormOwnPropsType = {
    captchaUrl : string | null | undefined
}




// {loginThunkCreator, isAuth} destructualization instead of passing props
const Login: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({loginThunkCreator, isAuth, captchaUrl}) => {

    const onSubmit = (formData: any) => {
        loginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }

    if (isAuth) {
        return <Redirect to={"/profile"}/>
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
    </div>
}

const mapStateToProps = (state: AppStateType) : MapStateToPropsType  => ({
    isAuth: state.authReducer.isAuth,
    captchaUrl: state.authReducer.captchaUrl?.captchaUrl
})

export default connect(mapStateToProps, {
    loginThunkCreator: loginThunkCreator
})(Login);