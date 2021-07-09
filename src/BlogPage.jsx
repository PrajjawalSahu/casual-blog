import React from 'react'

export default function BlogPage({username, title, text}) {
    return (
        <div className="BlogPage-component">
            <h1>{title}</h1>
            <h4>{username}</h4>
            <p>{text}</p>
        </div>
    )
}
