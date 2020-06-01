import React from 'react';
import { Field } from 'redux-form';
import { InputCustomWrapper, TextAreaCustomWrapper } from '../common/FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import style from "./../common/FormsControls/FormControls.module.css"

// redux-form prevent default page reloading using HOC wrapper method
// onSubmit={props.handleSubmit}

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={"Email"}
                    name={"email"}
                    component={TextAreaCustomWrapper}
                    validate={requiredField} />
            </div>
            <div>
                <Field placeholder={"Password"}
                    name={"password"}
                    component={TextAreaCustomWrapper}
                    validate={requiredField}
                    type={"password"}/>
            </div>
            <div>
                <Field type={"checkbox"}
                    name={"rememberMe"}
                    component={InputCustomWrapper} /> remember me
            </div>

            {props.error && <div className={style.formSummaryError}>
                {props.error}
            </div>}

            <div>
                <button>Login</button>
            </div>
        </form>
    )
};

export default LoginForm;