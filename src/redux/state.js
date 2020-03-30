import { rerenderEntireTree } from "../render";

let state = {

    profilePage:{
        posts: [
            { id: 1, message: 'hello to all!!', likesCount: 15 },
            { id: 2, message: 'my name is anton', likesCount: 100 }
        ]
    },

    messagesPage: {
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
    }
}


export let addPost = (postMessage) => {
    let newPost = {
        id : 3,
        message: postMessage,
        likesCount: 5
    };
    state.profilePage.posts.push(newPost);
    rerenderEntireTree(state);
}

export default state;
