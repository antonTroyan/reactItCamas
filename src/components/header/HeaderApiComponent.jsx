import React from 'react';
import Header from "./Header";
import * as axios from "axios";

class HeaderApiComponent extends React.Component {

    componentDidMount() {
        // {withCredentials : true} - need to allow server to send cookies cross servers
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials : true})
            .then(response => {
                if (response.data.resultCode === 0){
                    let userId = response.data.data.id;
                    let email  = response.data.data.email;
                    let login  = response.data.data.login;

                    this.props.setUserAuthData(userId, email, login);
                }
            });
    }

    render() {
        return <Header {...this.props}/>
    }
}

export default HeaderApiComponent;