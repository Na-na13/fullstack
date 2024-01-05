const filterReducer = (state='', action) => {
	console.log('ACTION: ', action)
	switch (action.type) {
		case 'FILTER':
			return action.payload

		default:
			return state
	}
}

export const filter = (key) => {
	return {
			type: 'FILTER',
			payload: { key }
	}
}

export default filterReducer