import React from 'react'

class AnecdoteList extends React.Component {
  vote = (id) => () => {
    this.props.store.dispatch({ type: 'VOTE', id })
  }

  render() {
    const anecdotes = this.props.store.getState()
    const renderAnecdote = anecdote => (
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={this.vote(anecdote.id)}>vote</button>
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
