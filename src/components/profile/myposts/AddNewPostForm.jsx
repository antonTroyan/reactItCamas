
import React from 'react';
import { Field } from 'redux-form';

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component="textarea"
                        name="newPostBody"
                        placeholder="Enter your message" />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    )
};

export default AddNewPostForm;
