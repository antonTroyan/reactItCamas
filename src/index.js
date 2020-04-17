import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from './redux/redux-store'
import {Provider} from './StoreContext';

let rerenderEntireTree = (store) => {
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('root'));
};

rerenderEntireTree(store);

store.subscribe(() => {
    rerenderEntireTree(store);
});