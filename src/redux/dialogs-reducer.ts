import {messagesApi} from "../api/api";

const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_MESSAGES = 'SET_MESSAGES';


type DialogType = {
    id: number
    name: string
}

type MessageType = {
    senderId: number
    message: string
}

let initialState = {
    dialogs: [] as Array<DialogType>,
    messages: [] as Array<MessageType>
};

type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any): InitialStateType => {

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
                dialogs: action.friendsList.map((e: { id: number; userName: string; }):DialogType => {
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

type SetMessagesActionCreatorType = {
    type: typeof SET_MESSAGES,
    messagesList : Array<MessageType>
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
    messageSenderId : number
}
export const sendMessageActionCreator = (messageSenderId: number, newMessageBody: string): SendMessageActionCreatorType => {
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


export const onSendMessageClickThunkCreator = (recipientId: number, messageText: string) => async (dispatch: any, getState: any) => {
    const response = await messagesApi.sendMessage(recipientId, messageText);
    const messageSenderId = getState().authReducer.userId;

    if (response.status === 200) {
        dispatch(sendMessageActionCreator(messageSenderId, messageText));
    }
}


export const downloadFriendsThunkCreator = () => async (dispatch:any) => {
    const response = await messagesApi.downloadFriends();

    if (response.status === 200) {
        dispatch(setFriendsActionCreator(response.data))
    }
}

export const downloadMessagesThunkCreator = (userId: number) => async (dispatch: any) => {
    const response = await messagesApi.downloadMessages(userId);

    if (response.status === 200) {
        dispatch(setMessagesActionCreator(response.data))
    }
}


export default dialogsReducer;