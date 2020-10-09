
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {profileApi} from "../api/profile-api";


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

type ActionsTypes = AddPostActionCreatorType | SetUserProfileActionCreatorType | UpdateUserStatusActionCreatorType |
    DeletePostActionCreatorType | SavePhotoActionCreatorType | SetEditModeEnabledActionCreatorType

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

type AddPostActionCreatorType = {
    type : typeof ADD_POST
    newPostBody : string
}

export const addPostActionCreator = (newPostBody: string):AddPostActionCreatorType => {
    return {
        type: ADD_POST,
        newPostBody
    }
};

type SetUserProfileActionCreatorType = {
    type: typeof SET_USER_PROFILE
    profile: ProfileType
}

export const setUserProfileActionCreator = (profile: ProfileType): SetUserProfileActionCreatorType => ({type: SET_USER_PROFILE, profile});

export const getUserProfileThunkCreator = (userId: number) : ThunkType => async (dispatch) => {

    let response = await profileApi.downloadUserProfile(userId);
    dispatch(setUserProfileActionCreator(response))
};

type UpdateUserStatusActionCreatorType = {
    type: typeof UPDATE_STATUS
    profileStatus : string
}

export const updateUserStatusActionCreator = (profileStatus: string): UpdateUserStatusActionCreatorType => ({type: UPDATE_STATUS, profileStatus});

export const getUsersStatusThunkCreator = (userId: number) : ThunkType => async (dispatch) => {

    let response = await profileApi.downloadUserStatus(userId);
    dispatch(updateUserStatusActionCreator(response.data))
};

export const updateUserStatusThunkCreator = (status: string) : ThunkType => async (dispatch) => {
    // handle error codes
    try {
        let response = await profileApi.updateUserStatus(status);
        if (response.resultCode === 0) {
            dispatch(updateUserStatusActionCreator(status))
        }
    } catch (error) {
        console.log(error)
    }
};

type DeletePostActionCreatorType = {
    type: typeof DELETE_POST
    postId : number
}
export const deletePostActionCreator = (postId: number): DeletePostActionCreatorType => ({type: DELETE_POST, postId})

type SavePhotoActionCreatorType = {
    type: typeof SAVE_PHOTO
    photos: PhotosType
}
export const savePhotoActionCreator = (photos: PhotosType): SavePhotoActionCreatorType => ({type: SAVE_PHOTO, photos})

export const savePhotoThunkCreator = (photo: PhotosType) : ThunkType => async (dispatch) => {
    let response = await profileApi.savePhoto(photo);

    if (response.resultCode === 0) {
        dispatch(savePhotoActionCreator(response.data.photos))
    }
};

type SetEditModeEnabledActionCreatorType = {
    type: typeof IS_EDIT_MODE_ENABLED
    resultValue : boolean
}

export const setEditModeEnabledActionCreator = (resultValue: boolean) : SetEditModeEnabledActionCreatorType => ({
    type: IS_EDIT_MODE_ENABLED,
    resultValue
});

export const saveProfileThunkCreator = (profile: ProfileType): ThunkType => async (dispatch: any, getState: any) => {

    const userId = getState().authReducer.userId;
    const data = await profileApi.saveProfile(profile);

    if (data.resultCode === 0) {
        dispatch(getUserProfileThunkCreator(userId))
        dispatch(setEditModeEnabledActionCreator(false))
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