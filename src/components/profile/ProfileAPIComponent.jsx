import React from 'react';
import Profile from "./Profile";

class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfile();
        }
    }

    refreshProfile() {
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
                        isOwner={!this.props.match.params.userId}
                        profile={this.props.profile}
                        status={this.props.status}
                        updateStatus={this.props.updateUserStatusThunkCreator}
                        savePhoto={this.props.savePhoto}
                        saveProfile={this.props.saveProfile}
        />
    }
}

export default ProfileAPIComponent;