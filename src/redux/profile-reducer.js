import { profileApi } from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'hello to all!!', likesCount: 15 },
        { id: 2, message: 'my name is anton', likesCount: 100 }
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
                message: action.newPostBody,
                likesCount: 5
            };
            let stateCopy = { ...state };
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }

        case UPDATE_STATUS: {
            return { ...state, status: action.profileStatus }
        }

        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id !== action.postId) }
        }

        default:
            return state;
    }
};

export const addPostActionCreator = (newPostBody) => {
    return {
        type: ADD_POST,
        newPostBody
    }
};


export const setUserProfileActionCreator = (profile) => ({ type: SET_USER_PROFILE, profile });

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {

    let response = await profileApi.downloadUserProfile(userId);
    dispatch(setUserProfileActionCreator(response))
};

export const updateUserStatusActionCreator = (profileStatus) => ({ type: UPDATE_STATUS, profileStatus });

export const getUsersStatusThunkCreator = (userId) => async (dispatch) => {

    let response = await profileApi.downloadUserStatus(userId);
    dispatch(updateUserStatusActionCreator(response.data))
};

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {

    let response = await profileApi.updateUserStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(updateUserStatusActionCreator(status))
    }
};

export const deletePostActionCreator = (postId) => ({ type: DELETE_POST, postId })


export default profileReducer;