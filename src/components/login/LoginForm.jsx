import React from 'react';
import {InputCustomWrapper, TextAreaCustomWrapper, createField} from '../common/FormsControls/FormsControls';
import {requiredField} from '../../utils/validators/validators';
import style from "./../common/FormsControls/FormControls.module.css"

// redux-form prevent default page reloading using HOC wrapper method
// onSubmit={props.handleSubmit}

const LoginForm = ({handleSubmit, error}) => {
    return (
        <form onSubmit={handleSubmit}>

            {createField("Email", "email", TextAreaCustomWrapper, [requiredField])}
            {createField("Password", "password", TextAreaCustomWrapper, [requiredField], "password")}
            {createField("checkbox", "rememberMe", InputCustomWrapper, [], "checkbox", "Remember me")}

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