const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let store = {

    _state: {
        profilePage: {
            posts: [
                { id: 1, message: 'hello to all!!', likesCount: 15 },
                { id: 2, message: 'my name is anton', likesCount: 100 }
            ],
            newPostText: ''
        },

        messagesPage: {
            dialogs: [
                { id: 1, name: 'Dimich' },
                { id: 2, name: 'Andrey' },
                { id: 3, name: 'Ivan' },
                { id: 4, name: 'China' }
            ],

            messages: [
                { id: 1, message: "hi" },
                { id: 1, message: "How are you" },
                { id: 1, message: "Yo" }
            ],

            newMessageBody : ""
        }
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
        if (action.type === ADD_POST) {
            let newPost = {
                id: 3,
                message: this._state.profilePage.newPostText,
                likesCount: 5
            };
            this._state.profilePage.posts.push(newPost);
            this._state.profilePage.newPostText = '';

        } else if (action.type === UPDATE_NEW_POST_TEXT) {
            this._state.profilePage.newPostText = action.newText;

        } else if (action.type === UPDATE_NEW_MESSAGE_BODY) {
            this._state.messagesPage.newMessageBody = action.body;

        } else if (action.type === SEND_MESSAGE) {
            let body = this._state.messagesPage.newMessageBody;
            this._state.messagesPage.newMessageBody = '';
            this._state.messagesPage.messages.push({ id: 6, message: body });

        }
        this._callSubscriber(this._state);
    }
};

export const addPostActionCreator = () => {
    return {
        type: ADD_POST 
    }
};

export const updateNewPostTextActionCreator = (text) => {
    return {
        type: UPDATE_NEW_POST_TEXT,
        newText: text
    }
};

export const updateNewMessageBodyActionCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    }
};

export const sendMessageCreator = () => {
    return {
        type: SEND_MESSAGE
    }
};

export default store;
window.store = store;

