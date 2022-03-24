import React from 'react'
import './Header.css'
import Auth from './Auth'
// import logo from './logo.png';

function Header({ userLog, createButtonBool }) {
    return (
        <div className="header-component">
            <div className="width-control-container">
                {/* casual blog / prajjawal brand website logo */}
                <a href="/"><div className="header-child logo">
                    casual blogs.
                </div>
                </a>

                {/* different tabs / different pages */}
                {/* &emsp;tab1 tab2 tab3 */}

                {userLog ? (
                    <div className="header-child ">
                        <a href="/create"><button className="header-button create-new-post-button">Create New Post</button></a>
                    </div>
                ) : (
                    <div className="header-child">
                        <h5 className="login-to-create-post-message">Log in to create a post</h5>
                    </div>
                )
                }

                {userLog ? (
                    <div className="header-child">
                        <a href="/auth"><button className="header-button">Log out</button></a>
                    </div>
                ) : (
                    <div className="header-child">
                        <a href="/auth"><button className="header-button">Log in</button></a>
                    </div>
                )
                }


                {/* profile, notification,etc buttons */}
                {/* &emsp;notification profile logout  */}
                {/* <Auth /> */}
            </div>
        </div>
    )
}

export default Header
