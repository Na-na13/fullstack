import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
	const anecdotes = useSelector(state => {
		if (state.filter.value !== '') {
			return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
		}
		return state.anecdotes
	})

	const anecdotesCopy = [...anecdotes]
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdote(id))
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
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			)}
		</>
	)
}

export default AnecdoteList