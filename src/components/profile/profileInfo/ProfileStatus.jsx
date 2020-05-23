import React from 'react';


class ProfileStatus extends React.Component {

    // local component state
    state = {
        editMode: false,
        status: this.props.status
    };

    onStatusChange = (event) => {
        this.setState({
            status : event.currentTarget.value
        })
    };

    activateEditMode() {

        // we call React.Component method that call rerender
        // if just call this.state.editMode = false ui will not update

        // this method called async
        this.setState({
            editMode: true
        })
    }

    // declaring method this way we avoid necessity of binding
    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    };

    render() {
        return (
            <div>Status -
                {!this.state.editMode &&
                <div>
                    <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status || 'No Status!'}</span>
                </div>
                }

                {this.state.editMode &&
                <div>
                    <input onChange={this.onStatusChange}
                           autoFocus={true}
                           onBlur={this.deactivateEditMode}
                           value={this.state.status}>
                    </input>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;