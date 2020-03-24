import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = (props) => {

    let postElements = props.postData.map((element) => {
        return <Post message={element.message} likesCount={element.likesCount} />
    })

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
                {postElements}
            </div>
        </div>
    )
}

export default MyPosts;