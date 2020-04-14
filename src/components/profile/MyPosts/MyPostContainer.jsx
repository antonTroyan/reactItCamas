import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {

    let profilePage = props.store.getState().profilePage;

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };

    let onPostChange = (text) => {
        props.store.dispatch(updateNewPostTextActionCreator(text));
    };

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost}
            posts={profilePage.posts}
            newPostText={profilePage.newPostText} />
    )
};

export default MyPostsContainer;