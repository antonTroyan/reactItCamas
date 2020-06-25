import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

let store = {

    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'hello to all!!', likesCount: 15},
                {id: 2, message: 'my name is anton', likesCount: 100}
            ],
            newPostText: ''
        },

        messagesPage: {
            dialogs: [
                {id: 1, name: 'Dimich'},
                {id: 2, name: 'Andrey'},
                {id: 3, name: 'Ivan'},
                {id: 4, name: 'China'}
            ],

            messages: [
                {id: 1, message: "hi"},
                {id: 1, message: "How are you"},
                {id: 1, message: "Yo"}
            ],

            newMessageBody: ""
        },

        sidebar: {}
    },

    _callSubscriber() {
        alert("No active subscribers");
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
        //паттерн наблюдатель 
    },

    dispatch(action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action);
        this._state.sidebar = sidebarReducer(this._state.sidebar, action);

        this._callSubscriber(this._state);
    }
};

export default store;
window.store = store;

