import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Togglable from './components/Togglable'

import { createNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogFormRef = useRef()


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption) {
      dispatch(createNotification('ERROR', exeption.response.data.error))
    }
  }

  const handleLogout = async (event) => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const updateBlog = async (blogObject) => {
    try {
      const updatedBlog = await blogService.like(blogObject)
      setBlogs(
        blogs.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog)),
      )
    } catch (exeption) {
      dispatch(createNotification('ERROR', exeption.response.data.error))
    }
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)) {
      try {
        await blogService.remove(blogObject)
        setBlogs(blogs.filter((b) => b.id !== blogObject.id))
        dispatch(createNotification('INFO', `removed ${blogObject.title} by ${blogObject.author}`))
      } catch (exeption) {
        dispatch(createNotification('ERROR', exeption.response.data.error))
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              type='password'
              value={password}
              name='Password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login-button' type='submit'>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.username} is logged in{' '}
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList currentUser={user}/>
    </div>
  )
}

export default App
