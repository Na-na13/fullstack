import { newAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"
import { useDispatch } from "react-redux"

const AnecdoteForm = () => {
	const dispatch = useDispatch()

	const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(anecdote))
    dispatch(showNotification(`you added '${anecdote}'`))
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm