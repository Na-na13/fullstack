import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUser(state, action) {
      return action.payload

    }
  }
})

export const { setUser } = userSlice.actions

export const loginUser = (username, password) => {
  return async dispatch => {
    const newUser = await loginService.login({
      username,
      password,
    })
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(newUser))
    blogService.setToken(newUser.token)
    dispatch(setUser(newUser))

  }
}

export const loggedUser = () => {
  return async dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch(setUser(user))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistUser')
    dispatch(setUser(null))
  }
}


export default userSlice.reducer
