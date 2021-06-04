import React,{useState} from 'react'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import {useDispatch} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {GoogleLogin} from 'react-google-login'
import InputAuth from './InputAuth/InputAuth';
import Icon from './Icon';
import { AUTH } from '../../constants/actionTypes';
import { signIn, signUp } from '../../actions/auth';

const Auth = () => {
    const initialState = {
        firstName: '', 
        lastName: '', 
        email: '',
        password: '',
        confirmPassword: '',

    }
    const [formData, setFormData] = useState(initialState)
    const [isSignUp, setIsSignUp] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const classes = useStyles()
    const dispatch = useDispatch();
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signUp(formData))
        }
        else {
            dispatch(signIn(formData))
        }
    }

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const switchMode = () => {
        setIsSignUp(!isSignUp)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const googleLoginSuccess = async(res) => {
        const result = res?.profileObj
        const token = res?.tokenId
        try {
            dispatch({type: AUTH, payload: {result, token}})
            history.push('/')
        } catch (error) {
            console.log(error)
        }

    }

    const googleLoginFailure = (error) => {
        console.log('login unsuccessful',error)
    }

    return (
        <Container component='main' maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component='h1' variant='h5'>{isSignUp ? 'Sign up': 'Sign in'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit} autoComplete='off'>
                    <Grid container spacing={2}>
                        {isSignUp && (
                            <>
                            <InputAuth name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                            <InputAuth name="lastName" label="Last Name" handleChange={handleChange} half />
                            </>
                        )}
                        <InputAuth name="email" label="Email Address" handleChange={handleChange} type="email" />
                        <InputAuth name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        { isSignUp && 
                        <InputAuth name="confirmPassword" label="Confirm Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        }
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            { isSignUp ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin 
          clientId='663586907072-hassmvffvfi3b7qtthm99r8q4nt51nt7.apps.googleusercontent.com'
          render={(renderProps)=>(
              <Button 
              className={classes.googleButton}
              color='primary'
              fullWidth
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              startIcon={<Icon />}
              variant='contained'>
                  Google Sign In
              </Button>
          )}
          onSuccess={googleLoginSuccess}
          onFailure={googleLoginFailure}
          cookiePolicy="single_host_origin"
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up" }
              </Button>
            </Grid>
          </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
