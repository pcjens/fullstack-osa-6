import React from 'react'
import { connect } from 'react-redux'
import Filter from './Filter'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  vote = (id, content) => () => {
    this.props.voteAnecdote(id)
    this.props.setNotification(`You voted for: '${content}'`)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
  }

  render() {
    const { anecdotes, filter } = this.props
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

const ConnectedAnecdoteList = connect((state) => {
  return {
    anecdotes: state.anecdotes,
    notification: state.notification,
    filter: state.filter
  }
}, {
  voteAnecdote, clearNotification, setNotification
})(AnecdoteList)

export default ConnectedAnecdoteList
