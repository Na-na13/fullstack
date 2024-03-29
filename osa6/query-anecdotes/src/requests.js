import axios from "axios"

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () =>
  axios.get(baseUrl).then(response => response.data)

export const createAnecdote = newAnecdote =>
	axios.post(baseUrl, newAnecdote).then(response => response.data)

export const voteAnecdote = anecdote =>
	axios.put(`${baseUrl}/${anecdote.id}`, {...anecdote, votes: anecdote.votes+1})
