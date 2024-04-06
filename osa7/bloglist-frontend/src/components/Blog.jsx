import pluralize from 'pluralize'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { likeBlog, removingBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, currentUser }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonText = visibility ? 'hide' : 'view'
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const updateBlog = async (event) => {
    console.log(blog)
    try {
      const likes = blog.likes + 1
      dispatch(likeBlog(blog.id, likes))
    } catch (exeption) {
      dispatch(createNotification('ERROR', exeption.response.data.error))
    }
  }

  const removeBlog = async (event) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      try {
        dispatch(removingBlog(blog))
        dispatch(createNotification('INFO', `removed ${blog.title} by ${blog.author}`))
      } catch (exeption) {
        dispatch(createNotification('ERROR', exeption.message))
      }
    }
  }

  if (!visibility) {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title}{' '}
        <button onClick={() => setVisibility(!visibility)}>{buttonText}</button>
      </div>
    )
  } else {
    return (
      <div className='blog' style={blogStyle}>
        {blog.title}{' '}
        <button onClick={() => setVisibility(!visibility)}>{buttonText}</button>{' '}
        <br />
        {blog.author}
        <br />
        {blog.url}
        <br />
        {pluralize('like', blog.likes, true)}{' '}
        <button onClick={updateBlog}>like</button>
        <br />
        {blog.user ? `Added by ${blog.user.username}` : ''}
        <br />
        {blog.user && currentUser.username === blog.user.username ? (
          <button onClick={removeBlog}>remove</button>
        ) : (
          ''
        )}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default Blog
