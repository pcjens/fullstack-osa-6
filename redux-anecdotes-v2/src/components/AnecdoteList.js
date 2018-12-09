import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (id, content) => () => {
    this.props.store.dispatch(voteAnecdote(id))
    this.props.store.dispatch(setNotification(`You voted for: '${content}'`))
    setTimeout(() => {
      this.props.store.dispatch(clearNotification())
    }, 5000)
  }

  render() {
    const anecdotes = this.props.store.getState().anecdotes
    const renderAnecdote = anecdote => (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={this.vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )

    return (
      <div>
        <h2>Anecdotes</h2>
        { anecdotes.sort((a, b) => b.votes - a.votes).map(renderAnecdote) }
      </div>
    )
  }
}

export default AnecdoteList
