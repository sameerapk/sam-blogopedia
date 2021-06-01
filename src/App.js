import React, {useEffect} from 'react'
import { AppBar, Container, Grid, Grow, Typography } from '@material-ui/core'
import Posts from './components/posts/Posts'
import Form from './components/form/Form'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts'

const App = () => {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[dispatch])
    return (
        <Container maxWidth='lg'>
            <AppBar position='static' color='inherit'>
                <Typography variant='h2' align='center'>Memories</Typography>
            </AppBar>
            <Grow in>
                <Container>
                    <Grid container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={7}>
                            <Posts />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    )
}

export default App