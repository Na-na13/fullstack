import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

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
      console.log('error occurred', exeption)
    }
  }

  const handleLogout = async (event) => {
    console.log('logginout')
    setUser(null)
    window.localStorage.removeItem('loggedBloglistUser')
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.create({
        title, author, url
      })
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exeption) {
      console.log('error occurred', exeption)
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type='text'
              value={username}
              name='Username'
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password
            <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.username} is logged in <button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
      <div>
        <form onSubmit={handleCreateBlog}>
            <div>
              title
                <input
                type='text'
                value={title}
                name='Title'
                onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
              author
              <input
              type='text'
              value={author}
              name='Author'
              onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url
              <input
              type='text'
              value={url}
              name='URL'
              onChange={({ target }) => setUrl(target.value)}
              />
            </div>
            <button type='submit'>create</button>
          </form>
        </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App