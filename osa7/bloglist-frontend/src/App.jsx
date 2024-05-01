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
      <h2>Log in to application</h2>
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

  const padding = {
    padding: 5
  }

  return (
    <>
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
        {user ? <LogoutForm /> : <Link style={padding} to='/login'>login</Link>}
      </div>
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
