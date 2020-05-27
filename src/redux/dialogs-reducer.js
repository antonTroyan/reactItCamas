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
    ]
};

export const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE: {
            let messageContent = action.newMessageBody;

            return {
                ...state,
                messages : [...state.messages, {id : 6, message : messageContent}]
            }
        }
            
        default:
            return state;
    }
};

export const sendMessageActionCreator = (newMessageBody) => {
    return {
        type: SEND_MESSAGE,
        newMessageBody
    }
};

export default dialogsReducer;