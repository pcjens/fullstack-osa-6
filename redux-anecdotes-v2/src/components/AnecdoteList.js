import React from 'react'
import Filter from './Filter'
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
    const filter = this.props.store.getState().filter
    const noFilter = filter.length === 0
    const anecdoteList = anecdotes.filter(a => noFilter || a.content.toLowerCase().includes(filter)).sort((a, b) => b.votes - a.votes)
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
        <Filter store={this.props.store}/>
        { anecdoteList.map(renderAnecdote) }
      </div>
    )
  }
}

export default AnecdoteList
