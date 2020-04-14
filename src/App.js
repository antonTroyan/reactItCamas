import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import {BrowserRouter, Route} from 'react-router-dom';
import store from './redux/redux-store';


const App = (props) => {
    debugger
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs store={props.store}/>}/>
                    <Route path='/profile' render={() => <Profile store={props.store}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;