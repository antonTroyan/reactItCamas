import React from 'react';
import { Field } from 'redux-form';

const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component="textarea"
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