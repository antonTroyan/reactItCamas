import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";

let rootReducer = combineReducers({
    // state property and handling reducer
    profilePage    :  profileReducer,
    dialogsReducer :  dialogsReducer,
    sidebar        :  sidebarReducer,
    usersPage      :  usersReducer,
    authReducer    :  authReducer,
    form           :  formReducer,
    appReducer     :  appReducer
});

// This way we make Type from RootReducerType and create state Type automatically
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// applyMiddleware() add new logic layer
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; --- [integration with chrome extension]
// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

export default store;