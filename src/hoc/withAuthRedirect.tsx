import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {AppStateType} from "../redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.authReducer.isAuth
    }
};

type MapPropsType = {
    isAuth: boolean
}

export const withAuthRedirect = (WrappedComponent: React.ComponentType) => {

    class RedirectComponent extends React.Component<MapPropsType> {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to='/login'/>
            }
            return <WrappedComponent {...this.props}/>
        }
    }

    // additional wrapper to add info [state] about auth
    return connect(mapStateToPropsForRedirect)(RedirectComponent);
};