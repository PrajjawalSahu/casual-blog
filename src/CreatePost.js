import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { storage, db, auth } from "./firebase";

function CreatePost({ username, setUserLog }) {
  const [blogText, setBlogText] = useState("");
  const [blogTitle, setBlogTitle] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser?.displayName) {
        //if user has logged in
        // console.log(authUser.displayName);
        setUserLog(authUser.displayName);
      }
    });
  }, []);

  const handleUpload = async () => {
    var timeId = new Date().toISOString();

    await db.collection("posts").doc(`${timeId}`).set({
      text: blogText,
      title: blogTitle,
      username: username,
      date: timeId,
    });

    // result.then(res => console.log(res.docs.map(doc => (
    //     {
    //         id: doc.id,
    //         post: doc.data()
    //     }
    //         ))));

    setBlogText("");
    setBlogTitle("");
    window.location.href = "/";
  };

  return (
    <div>
      {username ? (
        <>
          <h4>Author: {username} </h4>
          <input
            type="text"
            placeholder="title..."
            onChange={(event) => setBlogTitle(event.target.value)}
            value={blogTitle}
          ></input>
          <input
            type="text"
            placeholder="Write your blog here..."
            onChange={(event) => setBlogText(event.target.value)}
            value={blogText}
          ></input>
          <Button onClick={handleUpload}>Upload</Button>
        </>
      ) : (
        <>
        <h5>Kindly login to write a blog</h5>
        <a href="/auth"><button>go to login</button></a>
        </>
      )}
    </div>
  );
}

export default CreatePost;
