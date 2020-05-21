import React from 'react';


class ProfileStatus extends React.Component {

    // local component state
    state = {
        editMode : false
    }

    activateEditMode () {

        // we call React.Component method that call rerender
        // if just call this.state.editMode = false ui will not update

        // this method called async
        this.setState({
            editMode : true
        })
    }

    // declaring method this way we avoid necessity of binding
    deactivateEditMode = () => {
        debugger
        this.setState({
            editMode : false
        })
    }

    render() {
        return (
            <div>
                {!this.state.editMode && 
                    <div>
                        <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                    </div>
                }

                {this.state.editMode &&  
                    <div>
                        <input autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.status}></input>
                    </div>
                }
            </div>
        )
    }


};

export default ProfileStatus;