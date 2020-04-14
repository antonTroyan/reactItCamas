import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/profile-reducer';


const MyPosts = (props) => {

    debugger
    let postElements = props.store.getState().profilePage.posts.map((element) => {
        return <Post message={element.message}
            likesCount={element.likesCount} />
    });

    let addPost = () => {
        props.store.dispatch(addPostActionCreator());
    };

    let onPostChange = () => {
        let text = newPostElement.current.value;
        props.store.dispatch(updateNewPostTextActionCreator(text));
    };

    let newPostElement = React.createRef();

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange}
                        ref={newPostElement}
                        value={props.store.getState().profilePage.newPostText}></textarea>
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
};

export default MyPosts;