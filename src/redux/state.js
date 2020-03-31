let rerenderEntireTree;

let state = {

    profilePage:{
        posts: [
            { id: 1, message: 'hello to all!!', likesCount: 15 },
            { id: 2, message: 'my name is anton', likesCount: 100 }
        ],
        newPostText : ''
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


export const addPost = () => {
    let newPost = {
        id : 3,
        message: state.profilePage.newPostText,
        likesCount: 5
    };
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}

export const subscribe = (observer) => {
    rerenderEntireTree = observer;
    //паттерн наблюдатель 
}

export default state;
