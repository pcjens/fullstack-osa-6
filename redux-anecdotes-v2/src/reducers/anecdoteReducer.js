import anecdoteService from '../services/anecdotes'

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
    console.log(action.anecdotes)
    return action.anecdotes
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

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export default reducer
