import React from 'react'
import { Avatar, Modal } from '@material-ui/core';
import './Post.css'
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BlogPage from './BlogPage';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({

    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(2),
            width: '25ch',
        },
    },
    blue: {
        color: '#fff',
        backgroundColor: '#2D4F6B',
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: theme.spacing(1),
    },
    paper: {
        position: 'absolute',
        width: '80%',
        // margin: 12,
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        boxShadow: theme.shadows[5],
        outline: 'none',
        padding: theme.spacing(3, 0, 3),
    },
}));

function Post({ key, username, title, text }) {
    const [blogModalOpen, setBlogModalOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);

    return (
        <div className="post" >
            {/* post opened in modal on clicking the card*/}
            <Modal
                className="blog-modal"
                open={blogModalOpen}
                onClose={() => { setBlogModalOpen(false) }}      //onClose listens for clicks outside the modal --and-- the inline function sets the state "open" to false when clicked outside the modal that means modal will close when clicked outside
            >
                {
                    <div style={modalStyle} className={classes.paper}>
                        <BlogPage title={title} username={username} text={text} />
                    </div>
                }
            </Modal>
            {/* post header = avatar + username */}
            <div className="post_header" onClick={() => { setBlogModalOpen(true) }}>
                <Avatar className="post_avatar" className={classes.blue} alt={username} src={`https://api.multiavatar.com/${username}.png?apikey=BjkHozUl2CFywP`} />
                <h3>{username}</h3>
            </div>
            {/* <hr></hr> */}
            {/* body = first 4 lines of the blog with ... in the end = clickable takes into the blog page with comments and maybe profile of writer on side and etc etc*/}
            <div className="post_text" onClick={() => { setBlogModalOpen(true) }}>
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
