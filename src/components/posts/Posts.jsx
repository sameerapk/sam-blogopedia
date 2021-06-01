import React from 'react'
import {useSelector} from 'react-redux'
import useStyles from './styles'
import Post from './post/Post'

const Posts = () => {
    const posts = useSelector((state)=> state.posts)
    const classes = useStyles()
    console.log('here it is', posts)
    return (
        <>
            <h1>collection of posts</h1>
            <Post />
            <Post />
        </>
    )
}

export default Posts
