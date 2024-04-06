import { useState } from 'react'
import { createBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'


const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addNewBlog = async (event) => {
    event.preventDefault()
    try {
      dispatch(createBlog(title, author, url))
      dispatch(createNotification('INFO', `a new blog ${title} by ${author} added`))
    } catch (exeption) {
      console.log(exeption)
      dispatch(createNotification('ERROR', exeption.response.data.error))
    }
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input
            id='title'
            type='text'
            value={title}
            name='title'
            placeholder='title of the blog'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            id='author'
            type='text'
            value={author}
            name='author'
            placeholder='author of the blog'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            id='url'
            type='text'
            value={url}
            name='URL'
            placeholder='url of the blog'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
