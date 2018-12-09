const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    return [ ...old, { ...voted, votes: voted.votes + 1 } ]
  }
  case 'CREATE':
    return [ ...store, action.anecdote ]
  case 'INIT_ANECDOTES':
    return action.initialAnecdotes
  default:
    return store
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    anecdote
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const initializeAnecdotes = initialAnecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    initialAnecdotes
  }
}

export default reducer
