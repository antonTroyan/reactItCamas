import {profileApi} from "../api/api";


const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS = 'UPDATE_STATUS';

let initialState = {
    posts: [
        {id: 1, message: 'hello to all!!', likesCount: 15},
        {id: 2, message: 'my name is anton', likesCount: 100}
    ],
    newPostText: '',
    profile: null,
    status: ''
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 3,
                message: state.newPostText,
                likesCount: 5
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case UPDATE_NEW_POST_TEXT: {
            let stateCopy = {...state};
            stateCopy.newPostText = action.newText;
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case UPDATE_STATUS: {
            return {...state, status: action.profileStatus}
        }

        default:
            return state;
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

export const setUserProfileActionCreator = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfileThunkCreator = (userId) => (dispatch) => {
    profileApi.downloadUserProfile(userId).then(response => {
        dispatch(setUserProfileActionCreator(response))
    });
};

export const updateUserStatusActionCreator = (profileStatus) => ({type: UPDATE_STATUS, profileStatus});

export const getUsersStatusThunkCreator = (userId) => (dispatch) => {
    profileApi.downloadUserStatus(userId).then(response => {
        dispatch(updateUserStatusActionCreator(response.data))
    });
};

export const updateUserStatusThunkCreator = (status) => (dispatch) => {
    profileApi.updateUserStatus(status).then(response => {
        if (response.data.resultCode === 0) {
            dispatch(updateUserStatusActionCreator(status))
        }
    });
};


export default profileReducer;