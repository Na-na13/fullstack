import CommentForm from './CommentForm'
import LogoutForm from './LogoutForm'
import { likeBlog, removingBlog } from '../reducers/blogReducer'
import { createNotification } from '../reducers/notificationReducer'

import pluralize from 'pluralize'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = ({ currentUser }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const id = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  const updateBlog = async (event) => {
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
        navigate('/')
      } catch (exeption) {
        dispatch(createNotification('ERROR', exeption.message))
      }
    }
  }

  if (!currentUser || !blog) {
    return null

  } else {
    return (
      <div>
        <h2>blogs</h2>
        <LogoutForm />
        <h2>{blog.title}</h2>
        <h4>{blog.author}</h4>
        <a href={blog.url}>{blog.url}</a>
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
        <CommentForm blog={blog} />
        <h4>comments</h4>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={blog.id + index}>{comment}</li>
          ))}
        </ul>
      </div>
    )
  }
}

Blog.propTypes = {
  currentUser: PropTypes.object.isRequired,
}

export default Blog
