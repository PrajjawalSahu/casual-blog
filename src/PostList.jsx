import React, { useState, useEffect} from 'react'
import './PostList.css'
import Post from './Post.jsx'
import { db } from './firebase';

function PostList() {
    const [postArray, setPostArray] = useState([]);

        //useEffect runs a piece of code based on a specific condition
    useEffect( () => {
        db.collection("posts")
        .orderBy("date", "desc")
        .onSnapshot(snapshot => {
                setPostArray(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    post: doc.data()
                }
                    )));
            });
        

        
    }, []);

    return (
        <div className="post_list">
            {
                postArray.map(({id, post}) => (
                    <Post key={id} username={post.username} title={post.title} text={post.text} />
                ))
            }
            
        </div>
    )
}

export default PostList
