import React, { useState, useEffect } from "react";
import { Avatar, Button, TextField } from "@material-ui/core";
import { storage, db, auth } from "./firebase";
import "./CreatePost.css";
import Header from "./Header";

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
      <Header userLog={username} createButtonBool={true} />
      {username ? (
        <div className="create-post-full-page-container">
          <div className="create-post-author-text">
            {/* <p className="create-post-author">Blog author:</p>
            <Avatar
              className="post_avatar"
              alt={username}
              src="/broken-image.jpg"
            />
            <p> {username} </p> */}
          </div>
          <div className="create-post-form">
            <TextField
              type="text"
              style={{ margin: 12 }}
              inputProps={{ style: { fontSize: 60 } }} // font size of input text
              // InputLabelProps={{ style: { fontSize: 40 } }} // font size of input label
              // id="standard-basic"
              // label="Title"
              placeholder="Title"
              onChange={(event) => setBlogTitle(event.target.value)}
              value={blogTitle}
              variant="standard"
            ></TextField>

            <TextField
              className="create-post-blog-text-input"
              type="text"
              variant="outlined"
              rows={24}
              multiline
              style={{ margin: 12 }}
              id="standard-multiline-flexible"
              label="Write your blog here..."
              onChange={(event) => setBlogText(event.target.value)}
              value={blogText}
            ></TextField>

            <Button
              onClick={handleUpload}
              variant="contained"
              color="primary"
              large
              style={{ margin: 12 }}
              className="create-post-post-button"
            >
              Post
            </Button>
          </div>
        </div>
      ) : (
        <div className="create-post-full-page-container login-to-create-a-post">
          <h5>Kindly login to write a blog</h5>
          {/* <a href="/auth">
            <button>go to login</button>
          </a> */}
        </div>
      )}
    </div>
  );
}

export default CreatePost;
