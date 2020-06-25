import React from 'react';
import styles from "./FormControls.module.css"
import {Field} from 'redux-form';

// send all info in props but without input and meta
// rest operator, destructualization [topic]
export const TextAreaCustomWrapper = ({input, meta: {touched, error}, ...props}) => {

    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <textarea {...input}{...props} />
            </div>
            {/* {meta.error && <span>"Some error"</span>} if true - show */}
            {hasError && <span>{error}</span>}
        </div>
    )
}

export const InputCustomWrapper = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;
    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
            <div>
                <input {...input}{...props} />
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const createField = (placeholder, name, component, validators, type, text = "") => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               component={component}
               validate={validators}
               type={type}/>
        {text}
    </div>
)