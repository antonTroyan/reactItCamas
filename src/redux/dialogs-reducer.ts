import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionTypes} from "./redux-store";
import {messagesApi} from "../api/message-api";

const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_MESSAGES = 'SET_MESSAGES';

const SET_USER_AUTH_DATA = 'social/auth/SET_USER_AUTH_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social/auth/GET_CAPTCHA_URL_SUCCESS';


type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    senderId: number | null
    message: string
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>
};

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actions>

export const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {

        case SEND_MESSAGE: {
            return {
                ...state,
                messages: [...state.messages, {
                    senderId: action.messageSenderId,
                    message: action.newMessageBody
                }]
            }
        }

        case SET_FRIENDS: {
            return {
                ...state,
                dialogs: action.friendsList.map((e: any):DialogType => {
                    return {
                        id : e.id,
                        name: e.userName
                    }})
            }
        }

        case SET_MESSAGES: {
            return {
                ...state,
                messages: action.messagesList.map((e: any) => {return {
                        senderId: e.id,
                        message: e.body,
                        userId: e.senderId
                    }
                })
            }
        }

        case SET_USER_AUTH_DATA:
            return {
                ...state,
                ...action.data,
            }

        default:
            return state;
    }
};


export const actions = {

    setMessagesActionCreator: (messagesList: any) => ({
        type: SET_MESSAGES,
        messagesList: messagesList.items
    } as const),

    sendMessageActionCreator: (messageSenderId: number | null, newMessageBody: string) => ({
        type: SEND_MESSAGE,
        newMessageBody: newMessageBody,
        messageSenderId: messageSenderId
    } as const),

    setFriendsActionCreator: (friendsList: Array<DialogType>) => ({
        type: SET_FRIENDS,
        friendsList: friendsList
    } as const),

    setUserAuthDataActionCreator: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_AUTH_DATA,
        data: {userId: userId, email: email, login: login, isAuth: isAuth}
    } as const),

}

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type GetStateType = () => AppStateType;

export const onSendMessageClickThunkCreator = (recipientId: number, messageText: string): ThunkType => async (dispatch, getState: GetStateType) => {
    const response = await messagesApi.sendMessage(recipientId, messageText);
    const messageSenderId = getState().authReducer.userId;

    if (response.status === 200) {
        dispatch(actions.sendMessageActionCreator(messageSenderId, messageText));
    }
}


export const downloadFriendsThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await messagesApi.downloadFriends();

    if (response.status === 200) {
        dispatch(actions.setFriendsActionCreator(response.data))
    }
}

export const downloadMessagesThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    const response = await messagesApi.downloadMessages(userId);

    if (response.status === 200) {
        dispatch(actions.setMessagesActionCreator(response.data))
    }
}


export default dialogsReducer;