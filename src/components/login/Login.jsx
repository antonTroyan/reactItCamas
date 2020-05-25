import React from 'react';
import LoginForm from './LoginForm';
import { reduxForm } from 'redux-form';

// requesting HOC from redux-form library to wrap login form
const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit}/>
    </div>
}

export default Login;