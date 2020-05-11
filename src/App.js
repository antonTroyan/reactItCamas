import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import DialogsContainer from './components/dialogs/DialogsContainer';
import {BrowserRouter, Route} from 'react-router-dom';
import UsersContainer from './components/users/UsersContainer';
import ProfileContainer from "./components/profile/ProfileContainer";
import HeaderContainer from "./components/header/HeaderContainer";
import Login from './components/login/Login';


const App = () => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
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
            </div>
        </BrowserRouter>
    );
};

export default App;