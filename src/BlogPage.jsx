import React from 'react'
import './BlogPage.css'
export default function BlogPage({username, title, text}) {
    return (
        <div className="BlogPage-component">
            <h1>{title}</h1>
            <h4 className="blog-page-author">{username}</h4>
            <p className="blog-page-text">{text}</p>
        </div>
    )
}
