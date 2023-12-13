import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addNewBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewBlog}>
        <div>
          title
          <input
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

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm