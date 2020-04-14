import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/redux-store'

let rerenderEntireTree = (store) => {
    debugger
    ReactDOM.render(<App store={store} dispatch={store.dispatch.bind(store)}/>, 
        document.getElementById('root'));
};

rerenderEntireTree(store);

store.subscribe(() => {
    rerenderEntireTree(store);
});