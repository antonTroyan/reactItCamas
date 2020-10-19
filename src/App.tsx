import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from './components/login/Login';
import {connect, Provider} from 'react-redux';
import {initializeAppThunkCreator} from './redux/app-reducer';
import Preloader from './components/common/preloader/preloader';
import store, {AppStateType} from './redux/redux-store'

// https://ru.reactjs.org/docs/code-splitting.html
// DialogsContainer component will be downloaded not on the first random page downloading
// but on the specific page associated with this container
const DialogsContainer = React.lazy(() => import('./components/dialogs/DialogsContainer'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeAppThunkCreator: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {

    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert("Some error occurred!" + promiseRejectionEvent)
    }

    componentDidMount() {
        this.props.initializeAppThunkCreator();
        // This function will handle all errors that come from server [wrong result code]
        // If we subscribe to events we need to remove subscription later [componentWillUnmount()]. Clear trash
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
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

                        {/*We will choose only first that match*/}
                        <Switch>
                            <Route exact path='/'
                                   render={() => <Redirect to={"/profile"}/>}/>

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

                            <Route path='*'
                                   render={() => <div>404 NOT FOUND</div>}/>
                        </Switch>
                    </div>
                </React.Suspense>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    isAppInitialized: state.appReducer.isAppInitialized
})

let AppContainer = connect(mapStateToProps, {
    initializeAppThunkCreator: initializeAppThunkCreator
})(App);

const SamuraiJsApp: React.FC = () => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default SamuraiJsApp;