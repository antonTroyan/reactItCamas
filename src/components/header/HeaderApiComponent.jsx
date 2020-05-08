import React from 'react';
import Header from "./Header";

class HeaderApiComponent extends React.Component {

    componentDidMount() {
        // {withCredentials : true} - need to allow server to send cookies cross servers
        this.props.getUserDataThunkCreator();
    }

    render() {
        return <Header {...this.props}/>
    }
}

export default HeaderApiComponent;