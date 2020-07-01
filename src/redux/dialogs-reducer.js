import {messagesApi} from "../api/api";

const SEND_MESSAGE = 'SEND_MESSAGE';
const SET_FRIENDS = 'SET_FRIENDS';

let initialState = {

    dialogs: [],

    messages: [
        {id: 1, message: "hi"},
        {id: 1, message: "How are you"},
        {id: 1, message: "Yo"}
    ]
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

export default dialogsReducer;