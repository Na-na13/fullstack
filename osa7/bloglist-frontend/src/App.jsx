import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import { initializeBlogs } from './reducers/blogReducer'
import { getAllUsers, loggedUser } from './reducers/userReducer'

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, Link, Navigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import EditNoteIcon from '@mui/icons-material/EditNote'
import LoginIcon from '@mui/icons-material/Login'
import PeopleIcon from '@mui/icons-material/People'

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

const Login = () => {
  return (
    <div>
      <Notification />
      <LoginForm />
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.users.loggedInUser)
  const users = useSelector(state => state.users.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
    dispatch(loggedUser())
  }, [])

  const linkstyle = {
    padding: 5,
    textDecoration: 'none',
    underline: 'hover',
    color: '#ffffff'
  }

  const buttonstyle = {
    color: '#ffffff',
    padding: 10,
    margin: 5
  }

  return (
    <>
      <Container>
        <AppBar position='static'>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant='text' endIcon={<EditNoteIcon />} style={buttonstyle}>
              <Link style={linkstyle} to="/">blogs</Link>
            </Button>
            <Button variant='text' endIcon={<PeopleIcon />} style={buttonstyle}>
              <Link style={linkstyle} to="/users">users</Link>
            </Button>
            {user ?
              <LogoutForm /> :
              <Button variant='text' endIcon={<LoginIcon />} style={buttonstyle}>
                <Link style={linkstyle} to='/login'>login</Link>
              </Button>
            }
          </Box>
        </AppBar>
      </Container>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users' element={user ? <Users /> : <Navigate replace to='/login' />} />
        <Route path='/users/:id' element={user ? <User users={users} /> : <Navigate replace to='/login' />} />
        <Route path='/login' element={user ? <Navigate replace to='/' /> : <Login />} />
        <Route path='/blogs/:id' element={user ? <Blog currentUser={user} /> : <Navigate replace to='/login' />} />
      </Routes>
    </>
  )
}

export default App
