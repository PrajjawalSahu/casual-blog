import React from 'react'
import './Header.css'
import Auth from './Auth'

function Header({ userLog }) {
    return (
        <div className="header">
            {/* casual blog / prajjawal brand website logo */}
            logo

            {/* different tabs / different pages */}
            {/* &emsp;tab1 tab2 tab3 */}
            {userLog ? (
                <a href="/create"><button>Create Post</button></a>
            ) : (
                <div>
                    <h5>log in to create a post</h5>
                </div>
            )
            }

            {userLog ? (
                <a href="/auth"><button>Log out</button></a>
            ) : (
                <div>
                    <a href="/auth"><button>Log in</button></a>
                </div>
            )
            }


            {/* profile, notification,etc buttons */}
            {/* &emsp;notification profile logout  */}
            {/* <Auth /> */}

        </div>
    )
}

export default Header
