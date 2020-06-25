import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from './components/login/Login';
import {connect, Provider} from 'react-redux';
import {initializeAppThunkCreator} from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader';
import store from './redux/redux-store'

// https://ru.reactjs.org/docs/code-splitting.html
// DialogsContainer component will be downloaded not on the first random page downloading
// but on the specific page associated with this container
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))

class App extends Component {

    componentDidMount() {
        this.props.initializeAppThunkCreator();
    }

    render() {
        if (!this.props.isAppInitialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>

                {/* Handle loading. Work with React.lazy() */}
                <React.Suspense fallback={<Preloader/>}>
                    <div className='app-wrapper-content'>
                        <Route path='/dialogs'
                               render={() => <DialogsContainer/>}/>

                        {/* path='/profile/:userId' - recognise part of url as param*/}
                        {/*:userId? - ?  means optional param*/}
                        <Route path='/profile/:userId?'
                               render={() => <ProfileContainer/>}/>

                        <Route path='/users'
                               render={() => <UsersContainer/>}/>

                        <Route path='/login'
                               render={() => <Login/>}/>
                    </div>
                </React.Suspense>
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
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJsApp;