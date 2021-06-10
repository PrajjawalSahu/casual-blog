import React, {useState} from 'react';
import { Button } from '@material-ui/core';
import { storage, db} from "./firebase";

function CreatePost({username}) {
    const [blogText, setBlogText] = useState('');
    const [blogTitle, setBlogTitle] = useState('');

    const handleUpload = async () => 
    {

        var timeId = new Date().toISOString();
            
            await db.collection("posts").doc(`${timeId}`).set({
                text: blogText,
                title: blogTitle,
                username: username,
                date: timeId
            });


            // result.then(res => console.log(res.docs.map(doc => (
            //     {
            //         id: doc.id,
            //         post: doc.data()
            //     }
            //         ))));


            setBlogText('');
            setBlogTitle('');
    }

    return (
        <div>
            <h1>Write Blog as {username} </h1>
            <input type="text" placeholder='title...' onChange={event => setBlogTitle(event.target.value)} value={blogTitle}></input>
            <input type="text" placeholder='Write your blog here...' onChange={event => setBlogText(event.target.value)} value={blogText}></input>
            <Button onClick={handleUpload}>Upload</Button>
        </div>
    )
}

export default CreatePost
