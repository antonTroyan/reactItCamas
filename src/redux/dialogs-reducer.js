import {messagesApi} from "../api/api";

const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_FRIENDS = 'SET_FRIENDS';
const SET_MESSAGES = 'SET_MESSAGES';

let initialState = {

    dialogs: [],
    messages: []
};

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE: {

            return {
                ...state,
                messages: [...state.messages, {
                    userId: action.messageSenderId,
                    message: action.newMessageBody
                }]
            }
        }

        case SET_FRIENDS: {

            return {
                ...state,
                dialogs: action.friendsList.map(e => {
                    return {id : e.id, name: e.userName}
                })
            }
        }

        case SET_MESSAGES: {

            return {
                ...state,
                messages: action.messagesList.items.map(e => {
                    return {id: e.id, message: e.body, userId: e.senderId}
                })
            }
        }

        default:
            return state;
    }
};

export const sendMessageActionCreator = (messageSenderId, newMessageBody) => {

    return {
        type: SEND_MESSAGE,
        newMessageBody : newMessageBody,
        messageSenderId : messageSenderId
    }
};

export const onSendMessageClickThunkCreator = (recipientId, messageText) => async (dispatch, getState) => {
    const response = await messagesApi.sendMessage(recipientId, messageText);
    const messageSenderId = getState().authReducer.userId;

    if (response.status === 200) {
        dispatch(sendMessageActionCreator(messageSenderId, messageText));
    }
}

export const setFriendsActionCreator = (friendsList) => {
    return {
        type: SET_FRIENDS,
        friendsList : friendsList
    }
};


export const downloadFriendsThunkCreator = () => async (dispatch) => {
    const response = await messagesApi.downloadFriends();

    if (response.status === 200) {
        dispatch(setFriendsActionCreator(response.data))
    }
}

export const setMessagesActionCreator = (messagesList) => {
    return {
        type: SET_MESSAGES,
        messagesList : messagesList
    }
};

export const downloadMessagesThunkCreator = (userId) => async (dispatch) => {
    const response = await messagesApi.downloadMessages(userId);

    if (response.status === 200) {
        dispatch(setMessagesActionCreator(response.data))
    }
}


export default dialogsReducer;