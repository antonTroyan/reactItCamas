import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
    return <div className={s.content}>
        <div>
            my posts
        <div>
            <textarea></textarea>
            <button>Add post</button>
            <button>Remove</button>
            </div>
            <div className={s.posts}>
                <Post message='hello to all!!' likesamount='15'/>
                <Post message='my name is anton' likesamount='20'/>
            </div>
        </div>
    </div>
}

export default MyPosts;