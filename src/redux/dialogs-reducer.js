const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';
const SEND_MESSAGE = 'SEND_MESSAGE';

let initialState = {
    dialogs: [
        { id: 1, name: 'Dimich' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Ivan' },
        { id: 4, name: 'China' }
    ],

    messages: [
        { id: 1, message: "hi" },
        { id: 1, message: "How are you" },
        { id: 1, message: "Yo" }
    ],

    newMessageBody : ""
}

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_NEW_MESSAGE_BODY:
            state.newMessageBody = action.body;
            return state;

        case SEND_MESSAGE:
            let body = state.newMessageBody;
            state.newMessageBody = '';
            state.messages.push({ id: 6, message: body });
            return state;

        default:
            return state;
    }
};

export const updateNewMessageBodyActionCreator = (body) => {
    return {
        type: UPDATE_NEW_MESSAGE_BODY,
        body: body
    }
};

export const sendMessageActionCreator = () => {
    return {
        type: SEND_MESSAGE
    }
};

export default dialogsReducer;