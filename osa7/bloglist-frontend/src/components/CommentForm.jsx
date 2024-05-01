import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog } from '../reducers/blogReducer'


const CommentForm = ({ blog }) => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const addNewComment = async (event) => {
    event.preventDefault()
    try {
      dispatch(commentBlog(blog.id, comment))
    } catch (exeption) {
      console.log(exeption)
    }
    setComment('')
  }

  return (
    <div>
      <form onSubmit={addNewComment}>
        <div>
          <input
            id='comment'
            type='text'
            value={comment}
            name='comment'
            placeholder='write new comment'
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button type='submit'>add comment</button>
      </form>
    </div>
  )
}

export default CommentForm