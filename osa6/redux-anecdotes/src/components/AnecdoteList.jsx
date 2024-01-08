import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { showNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		if (state.filter.value !== '') {
			return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
		}
		return state.anecdotes
	})

	const anecdotesCopy = [...anecdotes]
  const dispatch = useDispatch()

  const vote = (anecdote) => {
		console.log('vote', anecdote.id)
		dispatch(voteAnecdote(anecdote))
		dispatch(showNotification(`you voted '${anecdote.content}'`))
  }
	return(
		<>
			{anecdotesCopy
				.sort((a, b) => b.votes - a.votes)
				.map(anecdote =>
				<div key={anecdote.id}>
					<div>
						{anecdote.content}
					</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList