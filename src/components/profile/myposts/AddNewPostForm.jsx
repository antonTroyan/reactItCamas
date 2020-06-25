import React from 'react';
import {Field} from 'redux-form';
import {requiredField, maxLengthCreator} from "../../../utils/validators/validators"
import {TextAreaCustomWrapper} from '../../common/FormsControls/FormsControls';


const maxLength10Creator = maxLengthCreator(10);

const AddNewPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field component={TextAreaCustomWrapper}
                           name="newPostBody"
                           placeholder={"Post message"}
                           validate={[requiredField, maxLength10Creator]}
                    />
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    )
};

export default AddNewPostForm;
