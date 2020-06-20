import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import { BrowserRouter, Route} from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from './components/login/Login';
import { connect, Provider } from 'react-redux';
import { initializeAppThunkCreator } from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader';
import store from './redux/redux-store'

class App extends Component {

    componentDidMount() {
        this.props.initializeAppThunkCreator();
    }

    render() {
        if (!this.props.isAppInitialized) {
            return <Preloader />
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs'
                        render={() => <DialogsContainer />} />

                    {/* path='/profile/:userId' - recognise part of url as param*/}
                    {/*:userId? - ?  means optional param*/}
                    <Route path='/profile/:userId?'
                        render={() => <ProfileContainer />} />

                    <Route path='/users'
                        render={() => <UsersContainer />} />

                    <Route path='/login'
                        render={() => <Login />} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAppInitialized: state.appReducer.isAppInitialized
})

let AppContainer = connect(mapStateToProps, {
    initializeAppThunkCreator: initializeAppThunkCreator
})(App);

const SamuraiJsApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer />
        </Provider>
    </BrowserRouter>
}

export default SamuraiJsApp;