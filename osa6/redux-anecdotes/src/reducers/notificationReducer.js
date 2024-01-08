import { createSlice } from "@reduxjs/toolkit"

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

export const setNotification = (message, time) => {
	return dispatch => {
		dispatch(showNotification(message))
		setTimeout(() => {
			dispatch(showNotification(''))
		}, (time*1000))
	}
}

export default notificationSlice.reducer
