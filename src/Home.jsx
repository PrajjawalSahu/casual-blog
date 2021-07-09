import React, { useState, useEffect } from 'react'
import PostList from './PostList.jsx'
import CreatePost from './CreatePost'
import Header from './Header'
import { auth } from './firebase';


export default function Home({userLog, setUserLog}) {

    //useState
    useEffect(() => {
        auth.onAuthStateChanged((authUser) => {
            if (authUser?.displayName) {
                //if user has logged in
                // console.log(authUser.displayName);
                setUserLog(authUser.displayName);
            }
        })
    }, [])

    return (
        <div className="Home-component">
            <Header userLog={userLog}/>

            {/* 
            {userLog ? (
                <CreatePost username={userLog} />
            ) : (
                <div>
                    <h2>log in to create a post</h2>
                </div>
            )
            }
             */}


            {/* special feature in central column single row long maybe like trending blogs or something else - not fixed - 1 row of multiple cards*/}
            {/* main central body with lots of posts 
                {so many posts as a list of Post components as i did in to-do list app}
            */}




            <PostList />
            {/* footer/ending of some sort (only if needed) */}

        </div>
    )
}
