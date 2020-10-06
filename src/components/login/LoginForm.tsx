import React from 'react';
import {InputCustomWrapper, TextAreaCustomWrapper, createField} from '../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';
import style from "./../common/FormsControls/FormControls.module.css"
import {InjectedFormProps} from "redux-form";
import {LoginFormOwnPropsType, LoginFormValuesType} from "./Login";

// redux-form prevent default page reloading using HOC wrapper method
// onSubmit={props.handleSubmit}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnPropsType> & LoginFormOwnPropsType>
    = ({handleSubmit, error, captchaUrl}) => {

    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", TextAreaCustomWrapper, [requiredField])}
            {createField("Password", "password", TextAreaCustomWrapper, [requiredField], "password")}
            {createField("checkbox", "rememberMe", InputCustomWrapper, [], "checkbox", "Remember me")}

            { captchaUrl && <img alt="" src={captchaUrl}/>}
            { captchaUrl && createField("Symbols from image", "captcha", TextAreaCustomWrapper, [requiredField])}

            {error &&
            <div className={style.formSummaryError}>
                {error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

export default LoginForm;