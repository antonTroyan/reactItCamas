import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import Dialogs from './components/dialogs/Dialogs';
import { BrowserRouter, Route } from 'react-router-dom';


const App = (props) => {
    return (
        <BrowserRouter>
            <div className='app-wrapper'>
                <Header />
                <Navbar />
                <div className='app-wrapper-content'>
                    <Route path='/dialogs' render={() => <Dialogs dialogsData={props.state.messagesPage.dialogs} 
                                                                messagesData={props.state.messagesPage.messages}/>}/>
                    <Route path='/profile' render={() => <Profile postData={props.state.profilePage.posts} 
                                                                addPost={props.addPost}/>}/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;