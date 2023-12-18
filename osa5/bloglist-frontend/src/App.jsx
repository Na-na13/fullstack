import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [info, setInfo] = useState({ message: null })
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const notify = (message, type='info') => {
    setInfo({
      message, type
    })

    setTimeout(() => {
      setInfo({ message: null } )
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in', username, password)

    try {
      const user = await loginService.login({
        username, password
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exeption){
      notify(exeption.response.data.error, 'error')
    }
  }

  const handleLogout = async (event) => {
    console.log('logginout')
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      console.log('create', newBlog)
      notify(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    } catch (exeption) {
      notify(exeption.response.data.error, 'error')
    }
  }

  const updateBlog = async (blogObject) => {
    console.log(user)
    try {
      await blogService.like(blogObject)
    } catch (exeption) {
      notify(exeption.response.data.error, 'error')
    }
  }

  const removeBlog = async (blogObject) => {
    if (window.confirm(`Remove ${blogObject.title} by ${blogObject.author}?`)){
      try {
        await blogService.remove(blogObject)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
        notify(`removed ${blogObject.title} by ${blogObject.author}`)
      } catch (exeption) {
        console.log(exeption)
        notify(exeption.response.data.error, 'error')
      }
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification info={info} />
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
          <button id='login-button' type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={info} />
      <p>{user.username} is logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} like={updateBlog} remove={removeBlog} currentUser={user} />
        )}
    </div>
  )
}

export default App