import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const UPDATE_STATUS = 'UPDATE_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';
const IS_EDIT_MODE_ENABLED = 'IS_EDIT_MODE_ENABLED';

let initialState = {
    posts: [
        {id: 1, message: 'hello to all!!', likesCount: 15},
        {id: 2, message: 'my name is anton', likesCount: 100}
    ],
    newPostText: '',
    profile: null,
    status: '',
    editMode: false
};

export const profileReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_POST: {
            let newPost = {
                id: 3,
                message: action.newPostBody,
                likesCount: 5
            };
            let stateCopy = {...state};
            stateCopy.posts = [...state.posts];
            stateCopy.posts.push(newPost);
            stateCopy.newPostText = '';
            return stateCopy;
        }

        case SET_USER_PROFILE: {
            return {...state, profile: action.profile}
        }

        case UPDATE_STATUS: {
            return {...state, status: action.profileStatus}
        }

        case DELETE_POST: {
            return {...state, posts: state.posts.filter(p => p.id !== action.postId)}
        }

        case SAVE_PHOTO: {
            return {...state, profile: {...state.profile, photos: action.photos}}
        }

        case IS_EDIT_MODE_ENABLED: {
            return {...state, editMode: action.resultValue}
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


export const setUserProfileActionCreator = (profile) => ({type: SET_USER_PROFILE, profile});

export const getUserProfileThunkCreator = (userId) => async (dispatch) => {

    let response = await profileApi.downloadUserProfile(userId);
    dispatch(setUserProfileActionCreator(response))
};

export const updateUserStatusActionCreator = (profileStatus) => ({type: UPDATE_STATUS, profileStatus});

export const getUsersStatusThunkCreator = (userId) => async (dispatch) => {

    let response = await profileApi.downloadUserStatus(userId);
    dispatch(updateUserStatusActionCreator(response.data))
};

export const updateUserStatusThunkCreator = (status) => async (dispatch) => {
    // handle error codes
    try {
        let response = await profileApi.updateUserStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(updateUserStatusActionCreator(status))
        }
    } catch (error) {
        console.log(error)
    }
};

export const deletePostActionCreator = (postId) => ({type: DELETE_POST, postId})
export const savePhotoActionCreator = (photos) => ({type: SAVE_PHOTO, photos})

export const savePhotoThunkCreator = (photo) => async (dispatch) => {
    let response = await profileApi.savePhoto(photo);

    if (response.resultCode === 0) {
        dispatch(savePhotoActionCreator(response.data.photos))
    }
};

export const setEditModeEnabledActionCreator = (resultValue) => ({
    type: IS_EDIT_MODE_ENABLED,
    resultValue
});

export const saveProfileThunkCreator = (profile) => async (dispatch, getState) => {

    const userId = getState().authReducer.userId;
    const response = await profileApi.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId))
        dispatch(setEditModeEnabledActionCreator(false))
    } else {
        const message = response.data.messages.length > 0 ? response.data.messages[0] : "Server does not return error message"
        let errorField = extractErrorField(message)

        // [errorField] using brackets we allowed to use variable as key
        dispatch(stopSubmit("edit-profile", {
            "contacts": {
                [errorField]: message
            }
        }));
    }
}

const extractErrorField = (errorMessage) => {

    return errorMessage
        .replace("Invalid url format (Contacts->", "")
        .replace(")", "")
        .toLowerCase();
}

export default profileReducer;