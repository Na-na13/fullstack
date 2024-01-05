import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
	name: 'filters',
	initialState: { value: '' },
	reducers: {
		filterAnecdotes(state, action) {
			return action.payload
		}
	}
})

export const { filterAnecdotes } = filterSlice.actions

export default filterSlice.reducer