import {createStore, combineReducers, applyMiddleware} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";

let reducers = combineReducers({
    // state property and handling reducer
    profilePage  :  profileReducer,
    messagesPage :  dialogsReducer,
    sidebar      :  sidebarReducer,
    usersPage    :  usersReducer,
    authReducer  :  authReducer
});

// applyMiddleware() add new logic layer
let store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;