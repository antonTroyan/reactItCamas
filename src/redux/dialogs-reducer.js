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
            let messageContent = action.newMessageBody;

            return {
                ...state,
                messages: [...state.messages, {id: 6, message: messageContent}]
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
            debugger
            return {
                ...state,
                messages: action.messagesList.items.map(e => {
                    return {id: e.id, message: e.body}
                })
            }
        }

        default:
            return state;
    }
};

export const sendMessageActionCreator = (newMessageBody) => {

    return {
        type: SEND_MESSAGE,
        newMessageBody : newMessageBody
    }
};

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