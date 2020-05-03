import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import DialogsContainer from './components/dialogs/DialogsContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/profile/ProfileContainer";


const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                    <Route path='/profile' render={() => <ProfileContainer/>}/>
                    <Route path='/users'   render={() => <UsersContainer/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;