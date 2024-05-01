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
import { Routes, Route } from 'react-router-dom'

const Home = ({ user }) => {
  const blogFormRef = useRef()
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList />
    </div>
  )
}

const App = () => {
  const user = useSelector(state => state.users.loggedInUser)
  console.log(user)
  const users = useSelector(state => state.users.allUsers)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(getAllUsers())
    dispatch(loggedUser())
  }, [])

  if(!user) {
    return null
  }

  return (
    <Routes>
      <Route path='/' element={<Home user={user} />} />
      <Route path='/users' element={<Users />} />
      <Route path='/users/:id' element={<User users={users} />} />
      <Route path='/blogs/:id' element={<Blog currentUser={user} />} />
    </Routes>
  )
}

export default App
