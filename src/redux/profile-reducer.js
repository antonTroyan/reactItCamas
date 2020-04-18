const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

let initialState = {
    posts: [
        { id: 1, message: 'hello to all!!', likesCount: 15 },
        { id: 2, message: 'my name is anton', likesCount: 100 }
    ],
    newPostText: ''
}

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 5
            };
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }


        default: return state;
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

export default profileReducer;