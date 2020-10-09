
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {messagesApi} from "../api/message-api";

const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_MESSAGES = 'SET_MESSAGES';


type DialogType = {
    id: number
    name: string
}

type MessageType = {
    senderId: number | null
    message: string
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>
};

type InitialStateType = typeof initialState

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
                    }
                })
            }
        }

        case SET_MESSAGES: {

            return {
                ...state,
                messages: action.messagesList.items.map((e: { id: number; body: string; senderId: number; }) => {
                    return {
                        id: e.id,
                        message: e.body,
                        userId: e.senderId
                    }
                })
            }
        }

        default:
            return state;
    }
};

type ActionsTypes = SetMessagesActionCreatorType | SendMessageActionCreatorType | SetFriendsActionCreatorType
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;
type GetStateType = () => AppStateType;

type SetMessagesActionCreatorType = {
    type: typeof SET_MESSAGES,
    messagesList : any
}
export const setMessagesActionCreator = (messagesList: Array<MessageType>): SetMessagesActionCreatorType => {
    return {
        type: SET_MESSAGES,
        messagesList : messagesList
    }
};


type SendMessageActionCreatorType = {
    type: typeof SEND_MESSAGE,
    newMessageBody : string,
    messageSenderId : number | null
}
export const sendMessageActionCreator = (messageSenderId: number | null, newMessageBody: string): SendMessageActionCreatorType => {
    return {
        type: SEND_MESSAGE,
        newMessageBody : newMessageBody,
        messageSenderId : messageSenderId
    }
};


type SetFriendsActionCreatorType = {
    type: typeof SET_FRIENDS,
    friendsList: Array<DialogType>
}
export const setFriendsActionCreator = (friendsList: Array<DialogType>): SetFriendsActionCreatorType => {
    return {
        type: SET_FRIENDS,
        friendsList : friendsList
    }
};


export const onSendMessageClickThunkCreator = (recipientId: number, messageText: string): ThunkType => async (dispatch, getState: GetStateType) => {
    const response = await messagesApi.sendMessage(recipientId, messageText);
    const messageSenderId = getState().authReducer.userId;

    if (response.status === 200) {
        dispatch(sendMessageActionCreator(messageSenderId, messageText));
    }
}


export const downloadFriendsThunkCreator = (): ThunkType => async (dispatch) => {
    const response = await messagesApi.downloadFriends();

    if (response.status === 200) {
        dispatch(setFriendsActionCreator(response.data))
    }
}

export const downloadMessagesThunkCreator = (userId: number): ThunkType => async (dispatch) => {
    const response = await messagesApi.downloadMessages(userId);

    if (response.status === 200) {
        dispatch(setMessagesActionCreator(response.data))
    }
}


export default dialogsReducer;