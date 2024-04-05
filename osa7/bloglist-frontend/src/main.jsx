import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'

import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer)

store.subscribe(() => {
  if (store.getState()) {
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
