import React from 'react';
import Profile from "./Profile";
import * as axios from "axios";

class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(response => {
                this.props.setUserProfile(response.data);
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