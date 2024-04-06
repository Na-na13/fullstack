import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    setBlogs(state, action) {
      return action.payload
    },
    like(state, action) {
      const id = action.payload.id
      const blog = state.find(blog => blog.id === id)
      const updatedBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      return state.map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
    },
    remove(state, action) {
      const id = action.payload.id
      return state.filter((blog) => (blog.id !== id))
    }
  }
})

export const { appendBlog, setBlogs, like, remove } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const blogObject = {
      title: title,
      author: author,
      url: url
    }
    const newBlog = await blogService.create(blogObject)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id, likes) => {
  return async dispatch => {
    const blogObject = {
      id: id,
      likes: likes
    }
    const likedBlog = await blogService.like(blogObject)
    dispatch(like(likedBlog))
  }
}

export const removingBlog = (blog) => {
  return async dispatch => {
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      user: blog.user,
    }
    const removedBlog = await blogService.remove(blogObject)
    dispatch(remove(removedBlog))
  }
}

export default blogSlice.reducer
