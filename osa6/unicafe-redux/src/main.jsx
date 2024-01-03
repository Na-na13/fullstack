import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {

  const handleAction = (type) => {
    store.dispatch({
      type: type
    })
  }

  const good = () => handleAction('GOOD')
  const ok = () => handleAction('OK')
  const bad = () => handleAction('BAD')
  const reset = () => handleAction('ZERO')

  return (
    <div>
      <button onClick={good}>good</button> 
      <button onClick={ok}>ok</button>
      <button onClick={bad}>bad</button>
      <button onClick={reset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
