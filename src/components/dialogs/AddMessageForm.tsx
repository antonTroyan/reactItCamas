import React from 'react';
import {Field, InjectedFormProps} from 'redux-form';
import {TextAreaCustomWrapper} from '../common/FormsControls/FormsControls';
import {requiredField, maxLengthCreator} from '../../utils/validators/validators';
import {LoginFormOwnPropsType, LoginFormValuesType} from "../login/Login";
import {MessageFormValuesType} from "./MessagesList";

const maxLengthCreator100 = maxLengthCreator(100);

const AddMessageForm: React.FC<InjectedFormProps<MessageFormValuesType>> = (props:any) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={TextAreaCustomWrapper}
                        validate={[requiredField, maxLengthCreator100]}
                        name="message"
                        placeholder="Enter your message"/>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </div>
        </form>
    )
};

export default AddMessageForm;
