const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

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
            ]
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
            this._callSubscriber(this._state);

        } else if (action.type === UPDATE_NEW_POST_TEXT) {

            this._state.profilePage.newPostText = action.newText;
            this._callSubscriber(this._state);

        }
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

export default store;
window.store = store;

