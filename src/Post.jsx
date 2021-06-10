import React from 'react'
import { Avatar } from '@material-ui/core';
import './Post.css'
function Post({key, username, title, text}) {
    return (
        <div className="post">
            {/* post header = avatar + username */}
            <div className="post_header">
                <Avatar className="post_avatar" alt={username} src="/broken-image.jpg" />
                <h3>{username}</h3>
            </div>
            {/* body = first 4 lines of the blog with ... in the end = clickable takes into the blog page with comments and maybe profile of writer on side and etc etc*/}
            <div className="post_text">
                <strong>{title} | </strong>
                {/* <br /> */}
            {/* <p> */}
                {text}
            {/* </p> */}
            </div>
        </div>
    )
}

export default Post
