import pluralize from 'pluralize'
import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, currentUser }) => {
  const [visibility, setVisibility] = useState(false)
  const buttonText = visibility ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = () => {
    console.log(blog)
    const likes = blog.likes + 1
    like({
      id: blog.id,
      likes: likes
    })
  }

  const removeBlog = () => {
    remove({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      user: blog.user
    })
  }

  if (!visibility) {
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{buttonText}</button>
      </div>
    )
  } else {
    return(
      <div key={blog.id} className='blog' style={blogStyle}>
        {blog.title} <button onClick={() => setVisibility(!visibility)}>{buttonText}</button> <br/>
        {blog.author}<br/>
        {blog.url}<br/>
        {pluralize('like', blog.likes, true)} <button onClick={addLike}>like</button><br/>
        {blog.user ? `Added by ${blog.user.username}` : ''}<br />
        {blog.user && currentUser.username === blog.user.username ? <button onClick={removeBlog}>remove</button> : ''}
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default Blog
