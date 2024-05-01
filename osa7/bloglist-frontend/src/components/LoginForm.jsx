import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { createNotification } from '../reducers/notificationReducer'

import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { FormControl, FormLabel, Typography } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(loginUser(username, password))
      setUsername('')
      setPassword('')
    } catch (exeption) {
      setPassword('')
      dispatch(createNotification('ERROR', exeption.response.data.error))
    }
  }

  return (
    <>
      <Typography sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <h2>Log in to application</h2>
      </Typography>
      <Box sx={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
        <form  onSubmit={handleLogin}>
          <FormControl>
            <FormLabel>Userame</FormLabel>
            <TextField
              id='username'
              type='text'
              value={username}
              name='Username'
              size='small'
              onChange={({ target }) => setUsername(target.value)}
            />
            <FormLabel>Password</FormLabel>
            <TextField
              id='password'
              type='password'
              value={password}
              name='Password'
              size='small'
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button type='submit'>Login</Button>
          </FormControl>
        </form>
      </Box>
    </>
  )
}

export default LoginForm