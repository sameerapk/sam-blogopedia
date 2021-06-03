import React from 'react'
import {useSelector} from 'react-redux'
import {Grid, CircularProgress} from '@material-ui/core'
import useStyles from './styles'
import Post from './post/Post'

const Posts = () => {
    const posts = useSelector((state)=> state.posts)
    const classes = useStyles()
    return (
        !posts.length ? null : (
            <Grid className={classes.container} container alignItems='stretch' spacing={3}>
                {
                    posts.map((post)=> (
                        <Grid key={post._id} item xs={12} sm={4} md={4}>
                           <Post post={post} /> 
                        </Grid>
                    ))
                }
            </Grid>
        )
    )
}

export default Posts
