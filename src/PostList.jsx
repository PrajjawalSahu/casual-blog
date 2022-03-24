import React, { useState, useEffect } from "react";
import "./PostList.css";
import Post from "./Post.jsx";
import { db } from "./firebase";
import InfiniteScroll from "react-infinite-scroll-component";

function PostList() {
  const [postArray, setPostArray] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [lastVisible, setLastVisible] = useState();
  //useEffect runs a piece of code based on a specific condition
  useEffect(() => {
    db
      .collection("posts")
      .orderBy("date", "desc")
      .limit(5)
      .onSnapshot((snapshot) => {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setPostArray(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );

        //     const snapshot = await firstFetch;
      });
    // var first = db.collection("posts").orderBy("date", "desc").limit(4);

    // first.get().then(function (documentSnapshots) {
    //   // Get the last visible document
    //   lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    //   // console.log("last", lastVisible);
    // }, []);
    console.log("re-render")
  },[]);

  function fetchData() {
    // var lastVisible = snapshot.docs[snapshot.docs.length - 1];
    // console.log("last", lastVisible);
    db.collection("posts")
      .orderBy("date", "desc")
      .startAfter(lastVisible)
      .limit(2)
      .onSnapshot((snapshot) => {
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        console.log(postArray.length);
        setTotalResults(postArray.length);
        setPostArray(
          postArray.concat(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              post: doc.data(),
            }))
          )
        );
      });

    // Construct a new query starting at this document,
    // Get the next 20 cities.
    // db.collection("posts")
    //   .orderBy("date", "desc")
    //   .startAfter(lastVisible)
    //   .onSnapshot((snapshot) => {
    //     setPostArray(
    //       postArray.concat(
    //         snapshot.docs.map((doc) => ({
    //           id: doc.id,
    //           post: doc.data(),
    //         }))
    //       )
    //     );
    //   });
  }

  return (
    <div className="post_list">
      <InfiniteScroll
        dataLength={postArray.length} //This is important field to render the next data
        next={fetchData}
        hasMore={postArray.length !== totalResults}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {postArray.map(({ id, post }) => (
          <Post
            key={id}
            username={post.username}
            title={post.title}
            text={postArray.length}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default PostList;
