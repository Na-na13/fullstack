import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notifications: notificationReducer,
    blogs: blogReducer
  }
})

store.subscribe(() => {
  const { notifications } = store.getState()
  if (notifications) {
    setTimeout(() => {
      store.dispatch({ type: 'EMPTY' })
    }, 5000)
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
