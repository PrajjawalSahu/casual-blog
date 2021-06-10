import React, { useState, useEffect} from 'react'
import './PostList.css'
import Post from './Post.jsx'
import { db } from './firebase';

function PostList() {
    const [postArray, setPostArray] = useState([
        // {
        //     username: "Prajjawal Sahu",
        //     title: "First Post",
        //     text: "first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post first blog post "
        // },
        // {
        //     username: "Uchiha Itachi",
        //     title: "Second Post",
        //     text: "second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe second post hehe "
        // }
    ]);

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
