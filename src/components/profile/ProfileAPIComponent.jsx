import React from 'react';
import Profile from "./Profile";
import {usersAPI} from "../../api/api";

class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId){
            userId = 2;
        }
        usersAPI.downloadUserProfile(userId).then(response => {
            this.props.setUserProfile(response);
        });
    }

    render() {
        /// {...this.props} open props and send them
        /// as attributes [pass all attributes that come to container]
        return <Profile {...this.props}
                        profile={this.props.profile}/>
    }
}

export default ProfileAPIComponent;