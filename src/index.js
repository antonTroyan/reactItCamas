import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let dialogsData = [
    { id: 1, name: 'Dimich' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Ivan' },
    { id: 4, name: 'China' }
]


let messagesData = [
    { id: 1, message: "hi" },
    { id: 1, message: "How are you" },
    { id: 1, message: "Yo" }
]

let postData = [
    { id: 1, message: 'hello to all!!', likesCount: 15 },
    { id: 2, message: 'my name is anton', likesCount: 100 }
]


ReactDOM.render(<App dialogsData={dialogsData} messagesData={messagesData} postData={postData}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
