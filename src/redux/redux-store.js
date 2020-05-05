import { createStore, combineReducers } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
    // state property and handling reducer
    profilePage  :  profileReducer,
    messagesPage :  dialogsReducer,
    sidebar      :  sidebarReducer,
    usersPage    :  usersReducer,
    authReducer  :  authReducer
});

let store = createStore(reducers);

window.store = store;

export default store;