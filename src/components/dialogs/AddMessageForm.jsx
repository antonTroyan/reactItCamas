import React from 'react';
import {Field} from 'redux-form';
import {TextAreaCustomWrapper} from '../common/FormsControls/FormsControls';
import {requiredField, maxLengthCreator} from '../../utils/validators/validators';

const maxLengthCreator100 = maxLengthCreator(100);

const AddMessageForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={TextAreaCustomWrapper}
                        validate={[requiredField, maxLengthCreator100]}
                        name="newMessageBody"
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
