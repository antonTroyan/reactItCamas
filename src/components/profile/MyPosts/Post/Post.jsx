import React from 'react';
import s from './Post.module.css';

const Post = (props) => {
    return <div className={s.item}>
        <img src='data:image/jpeg;base64,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' />
        {props.message}
        <div>
            <span>Likes:{props.likesCount}</span>
        </div>
    </div>
};

export default Post;