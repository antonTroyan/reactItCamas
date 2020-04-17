import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import StoreContext from '../../../StoreContext';

const MyPostsContainer = () => {

    return (
        <StoreContext.Consumer> 
            {
            (store) => {
            let profilePage = store.getState().profilePage;

            let addPost = () => {
                store.dispatch(addPostActionCreator());
            };
        
            let onPostChange = (text) => {
                store.dispatch(updateNewPostTextActionCreator(text));
            };

            return (
            <MyPosts updateNewPostText={onPostChange} addPost={addPost}
                posts={profilePage.posts}
                newPostText={profilePage.newPostText} />)
        }
        }
        </StoreContext.Consumer>
    )
};

export default MyPostsContainer;