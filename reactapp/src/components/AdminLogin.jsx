import React, { useState } from 'react'
import store from '../store/store'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { setIsLogin, setWorker } from '../store/reducer'
import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, IconButton, InputAdornment, Paper, TextField } from '@mui/material'
import { Link } from 'react-router-dom';

export default function AdminLogin({ navigate, defaultAvatar }) {
    const [Visibility, setVisibility] = useState(false)

    const handleVisibility = () => {
        setVisibility(!Visibility)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const workers = store.getState().store.workers
        const data = new FormData(e.target)

        workers?.map(worker => {
            if (worker?.username === data.get('username-email') || worker?.email === data.get('username-email')) {
                if (worker?.password === data.get('password')) {
                    store.dispatch(setIsLogin(true))
                    store.dispatch(setWorker({ ...worker, present: true, time: new Date().toUTCString() }))

                    alert('login successful')
                    navigate('/')

                    // store.dispatch(setWorker(user))
                }
            }
        })
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 15 }}>
            <Paper component='div' sx={{ display: 'block', padding: '4rem 3rem 3rem 3rem', overflow: 'hidden' }} elevation={3}>
                <Box sx={{
                    transformOrigin: '50% 100%',
                    '@keyframes rotation-intro': {
                        '0%': {
                            transform: 'rotate(90deg)'
                        },
                        '50%': {
                            transform: 'rotate(-5deg)'
                        },
                        '75%': {
                            transform: 'rotate(5deg)'
                        },
                        '100%': {
                            transform: 'rotate(0deg)'
                        }
                    },
                    animation: 'rotation-intro 0.45s ease-in-out'
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingBottom: '2rem' }}>
                        <Avatar src={defaultAvatar} sx={{ width: 96, height: 96 }} />
                    </Box>
                    <Box component='form' sx={{ width: 400 }} onSubmit={handleSubmit}>
                        <TextField margin='normal' required fullWidth id='username-email' label='Admin' name='username-email' autoComplete='email' autoFocus
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton>
                                            <PersonIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }} />

                        <TextField margin='normal' required fullWidth id='password' type={Visibility ? 'text' : 'password'} label='password' name='password'
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position='end'>
                                        <IconButton onClick={handleVisibility}>
                                            {
                                                Visibility ? (
                                                    <VisibilityIcon />
                                                ) : (
                                                    <VisibilityOffIcon />
                                                )
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Button type='submit' sx={{ marginTop: '2rem', backgroundColor: 'black', '&:hover': { color: 'black', backgroundColor: 'white' } }} variant='contained'>Log in as Admin</Button>
                        </Box>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}
