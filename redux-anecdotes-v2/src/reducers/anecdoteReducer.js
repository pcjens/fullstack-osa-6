const getId = () => (100000*Math.random()).toFixed(0)

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.id)
    const voted = store.find(a => a.id === action.id)
    return [ ...old, { ...voted, votes: voted.votes + 1 } ]
  }
  case 'CREATE':
    return [ ...store, { content: action.content, id: getId(), votes: 0 } ]
  default:
    return store
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'CREATE',
    content
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export default reducer
