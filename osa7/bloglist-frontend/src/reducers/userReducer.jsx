import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState:{
    loggedInUser: null,
    allUsers: []
  },
  reducers: {
    setUser(state, action) {
      state.loggedInUser = action.payload
    },
    setAllUsers(state, action) {
      state.allUsers = action.payload
    }
  }
})

export const { setUser, setAllUsers } = userSlice.actions

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

export const getAllUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(setAllUsers(users))
  }
}


export default userSlice.reducer
