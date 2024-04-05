// Reducer
const notificationReducer = (state = null, action) => {
  console.log(action)
  switch (action.type) {
  case 'INFO':
    return action
  case 'ERROR':
    return action
  case 'EMPTY':
    return null
  default:
    return state
  }
}

// Action creator
export const createNotification = (type, content) => {
  return {
    type: type,
    payload: {
      content: content,
    }
  }
}

export default notificationReducer