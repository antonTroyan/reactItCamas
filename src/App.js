import React from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Technologies/>
        </div>
    );
}

const Technologies = () => {
    return (
        <div>
            <ul>css</ul>
            <ul>react</ul>
            <ul>js</ul>
        </div>
    );
}

const Header = () => {
    return (
        <div>
            <a href=''>Home</a>
            <a>News feed</a>
            <a>Messages</a>
        </div>
    );
}

export default App;
