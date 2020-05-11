import React from 'react';
import Profile from "./Profile";
import { Redirect } from 'react-router-dom';

class ProfileAPIComponent extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if (!userId){
            userId = 2;
        }
        this.props.getUserProfileThunkCreator(userId);
    }

    render() {
        if (!this.props.isAuth) {
            return <Redirect to={"/login"}/>;
        }    

        /// {...this.props} open props and send them
        /// as attributes [pass all attributes that come to container]
        return <Profile {...this.props}
                        profile={this.props.profile}/>
    }
}

export default ProfileAPIComponent;