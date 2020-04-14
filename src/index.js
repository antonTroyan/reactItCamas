import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/redux-store'

let rerenderEntireTree = (store) => {
    ReactDOM.render(<App store={store}/>, 
        document.getElementById('root'));
};

rerenderEntireTree(store);

store.subscribe(() => {
    rerenderEntireTree(store);
});