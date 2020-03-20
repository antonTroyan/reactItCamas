import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {

    let postData = [
        {id: 1, message: 'hello to all!!' ,likesCount:15},
        {id: 2, message: 'my name is anton' ,likesCount:100}
    ]



    return (
        <div className={s.postsBlock}>
            <h3>my posts</h3>
            <div>
                <div>
                    <textarea></textarea> 
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                <Post message={postData[0].message} likesamount={postData[0].likesCount} />
                <Post message={postData[1].message} likesamount={postData[1].likesCount} />
            </div>
        </div>
    )
}

export default MyPosts;