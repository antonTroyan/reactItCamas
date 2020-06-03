import React from 'react';
import Profile from "./Profile";

class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfileThunkCreator(userId);
        this.props.getUserStatusThunkCreator(userId);
    }

    render() {
        /// {...this.props} open props and send them
        /// as attributes [pass all attributes that come to container]
        return <Profile {...this.props}
            profile={this.props.profile}
            status={this.props.status}
            updateStatus={this.props.updateUserStatusThunkCreator}
        />
    }
}

export default ProfileAPIComponent;