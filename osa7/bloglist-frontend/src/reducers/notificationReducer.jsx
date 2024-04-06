import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload
    }
  }
})

export const { showNotification } = notificationSlice.actions

export const createNotification = (type, message) => {
  return dispatch => {
    dispatch(showNotification({ content: message, type: type }))
    setTimeout(() => {
      dispatch(showNotification(''))
    }, (5000))
  }
}

export default notificationSlice.reducer