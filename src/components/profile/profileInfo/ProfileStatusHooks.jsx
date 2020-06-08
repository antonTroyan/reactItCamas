import React, { useState } from 'react';


const ProfileStatusHooks = (props) => {

    // Hook returns array with :
    // 1 - value, 
    // 2 - function to change value
    // let stateWithSetState = useState(false);
    // let editMode = stateWithSetState[0];
    // let setEditMode = stateWithSetState[1];

    // another way of assingment [destructuring assignment]
    let [editMode, setEditMode] = useState(false);

    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (event) => {
        setStatus(event.currentTarget.value);
    }


    return (
        <div>Status -
            { !editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || 'No Status!'}</span>
                </div>
            }

            {editMode &&
                <div>
                    <input onBlur={deactivateEditMode}
                        autoFocus={true}
                        onChange={onStatusChange}
                        value={status}>
                    </input>
                </div>
            }
        </div>
    )
}


export default ProfileStatusHooks;