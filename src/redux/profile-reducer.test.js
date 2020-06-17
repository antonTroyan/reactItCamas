import React from 'react';
import profileReducer, { addPostActionCreator, deletePostActionCreator } from './profile-reducer';

const TEST_VALUE = "Test Post"
let initialState = {
    posts: [
        { id: 1, message: 'hello to all!!', likesCount: 15 },
        { id: 2, message: 'my name is anton', likesCount: 100 }
    ],
};

test('Length of posts should be incremented', () => {

    let action = addPostActionCreator(TEST_VALUE)
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(3);
});

test('Message of the post should be correct', () => {

    let action = addPostActionCreator(TEST_VALUE)
    let newState = profileReducer(initialState, action);

    expect(newState.posts[2].message).toBe(TEST_VALUE)
});

test('After deleting message posts length should be decrement', () => {

    let action = deletePostActionCreator(1)
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(1)
});


test('After deleting message posts length should not decrement if id is incorrect', () => {

    let action = deletePostActionCreator(100)
    let newState = profileReducer(initialState, action);

    expect(newState.posts.length).toBe(2)
});
