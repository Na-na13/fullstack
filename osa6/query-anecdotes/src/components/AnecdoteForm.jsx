import { useContext } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote } from "../requests"
import NotificationContext from "../NotificationContext"


const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const [notification, dispatch] = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    dispatch({ type: 'SHOW', payload: `you added anecdote '${content}'` })
    setTimeout(() => {
      dispatch({ type: 'HIDE'})
    }, 5000)
    newAnecdoteMutation.mutate({ content, votes: 0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
