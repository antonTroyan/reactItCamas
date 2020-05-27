import React from 'react';
import { Field } from 'redux-form';
import { TextAreaCustomWrapper } from '../common/FormsControls/FormsControls';
import { requiredField, maxLengthCreator } from '../../utils/validators/validators';

const maxLengthCreator20 = maxLengthCreator(20);

const AddMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={TextAreaCustomWrapper}
                        validate={[requiredField, maxLengthCreator20]}
                        name="newMessageBody"
                        placeholder="Enter your message" />
                </div>
                <div>
                    <button>Send</button>
                </div>
            </div>
        </form>
    )
};

export default AddMessageForm;
