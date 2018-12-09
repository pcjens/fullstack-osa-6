import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (id, content, votes) => () => {
    this.props.voteAnecdote(id, votes)
    this.props.notify(`You voted for: '${content}'`, 5)
  }

  render() {
    const { anecdotes } = this.props
    const renderAnecdote = anecdote => (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={this.vote(anecdote.id, anecdote.content, anecdote.votes)}>vote</button>
        </div>
      </div>
    )

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter store={this.props.store}/>
        { anecdotes.map(renderAnecdote) }
      </div>
    )
  }
}

const processAnecdotes = (anecdotes, filter) => {
  return anecdotes
    .filter(a => filter.length === 0 || a.content.toLowerCase().includes(filter))
    .sort((a, b) => b.votes - a.votes)
}

const ConnectedAnecdoteList = connect((state) => {
  return {
    anecdotes: processAnecdotes(state.anecdotes, state.filter)
  }
}, {
  voteAnecdote, notify
})(AnecdoteList)

export default ConnectedAnecdoteList
