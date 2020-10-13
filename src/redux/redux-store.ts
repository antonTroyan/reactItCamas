import {createStore, combineReducers, applyMiddleware, compose, Action} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware, {ThunkAction} from "redux-thunk";
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


// Special functionality to create automatically types of actions
// infer - ask compiler to determine type
// PropertiesTypes will be smth that have string key and smth in value [infer - выделить]
type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never

// {[key: string]: (...args: any[]) => any} - key string and value function that takes smth and return smth
export type InferActionTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>

// AT - action types
export type BaseThunkType<AT extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, AT>;

export default store;