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

    // this method called when local or global change [it calls rerender]
    // created to add sync
    // 1 We render profile with old status from global state, because in some cases page render before request returns
    // 2 In this way when new status come, it call method, and it set new value in local state
    componentDidUpdate (prevProps, prevState) {
        if (prevProps.status !== this.props.status){
            this.setState({
                status : this.props.status
            })
        }
    }

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