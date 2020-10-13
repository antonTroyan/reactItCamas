import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionTypes} from "./redux-store";
import {profileApi} from "../api/profile-api";
import {ResultCodesEnum} from "../api/api";

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
    ] as Array<PostType>,
    newPostText: '',
    profile: null as ProfileType | null,
    status: '',
    editMode: false
};

export type InitialStateType = typeof initialState;

type ThunkType = BaseThunkType<ActionsTypes | ReturnType <typeof stopSubmit>>
type ActionsTypes = InferActionTypes<typeof actions>

export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

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
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
        }

        case IS_EDIT_MODE_ENABLED: {
            return {...state, editMode: action.resultValue}
        }

        default:
            return state;
    }
};


export const actions = {

    addPostActionCreator: (newPostBody: string) => ({type: ADD_POST, newPostBody} as const),
    setUserProfileActionCreator: (profile: ProfileType) => ({type: SET_USER_PROFILE, profile} as const),
    updateUserStatusActionCreator: (profileStatus: string) => ({type: UPDATE_STATUS, profileStatus} as const),
    deletePostActionCreator: (postId: number) => ({type: DELETE_POST, postId} as const),
    savePhotoActionCreator: (photos: PhotosType) => ({type: SAVE_PHOTO, photos} as const),
    setEditModeEnabledActionCreator: (resultValue: boolean) => ({type: IS_EDIT_MODE_ENABLED, resultValue} as const)

}

export const getUserProfileThunkCreator = (userId: number) : ThunkType => async (dispatch) => {
    let response = await profileApi.downloadUserProfile(userId)
    dispatch(actions.setUserProfileActionCreator(response))
};

export const getUsersStatusThunkCreator = (userId: number) : ThunkType => async (dispatch) => {
    let response = await profileApi.downloadUserStatus(userId)
    dispatch(actions.updateUserStatusActionCreator(response.data))
};

export const updateUserStatusThunkCreator = (status: string) : ThunkType => async (dispatch) => {
    // handle error codes
    try {
        let response = await profileApi.updateUserStatus(status)
        if (response.resultCode === 0) {
            dispatch(actions.updateUserStatusActionCreator(status))
        }
    } catch (error) {
        console.log(error)
    }
};

export const savePhotoThunkCreator = (photo: PhotosType) : ThunkType => async (dispatch) => {
    let response = await profileApi.savePhoto(photo)
    if (response.resultCode === 0) {
        dispatch(actions.savePhotoActionCreator(response.data.photos))
    }
};

export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const userId = getState().authReducer.userId
    const data = await profileApi.saveProfile(profile)

    if (data.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            await dispatch(getUserProfileThunkCreator(userId))
            dispatch(actions.setEditModeEnabledActionCreator(false))
        } else {
            throw new Error("UserId can`t be [null]!")
        }

    } else {
        const message = data.messages.length > 0 ? data.messages[0] : "Server does not return error message"
        let errorField = extractErrorField(message)

        // [errorField] using brackets we allowed to use variable as key
        dispatch(stopSubmit("edit-profile", {
            "contacts": {
                [errorField]: message
            }
        }));
    }
}

const extractErrorField = (errorMessage: string) => {

    return errorMessage
        .replace("Invalid url format (Contacts->", "")
        .replace(")", "")
        .toLowerCase();
}

export default profileReducer;