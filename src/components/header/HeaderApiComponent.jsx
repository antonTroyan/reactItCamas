import React from 'react';
import Header from "./Header";

class HeaderApiComponent extends React.Component {

    render() {
        return <Header {...this.props}/>
    }
}

export default HeaderApiComponent;