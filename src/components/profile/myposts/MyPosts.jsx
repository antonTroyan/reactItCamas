import React from 'react';
import s from './MyPosts.module.css';
import Post from './post/Post';
import AddNewPostForm from './AddNewPostForm';
import {reduxForm} from 'redux-form';


const MyPosts = (props) => {

    let postElements = props.posts.map((element) => {
        return <Post key={element.id} message={element.message}
                     likesCount={element.likesCount}/>
    });

    const AddNewPostReduxForm = reduxForm({form: "addNewPostReduxForm"})(AddNewPostForm)

    let onNewPostCreated = (values) => {
        debugger
        props.addPost(values.newPostBody);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <AddNewPostReduxForm onSubmit={onNewPostCreated}/>
            <div className={s.posts}>
                {postElements}
            </div>
        </div>
    )
};

export default MyPosts;