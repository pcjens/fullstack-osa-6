import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

class AnecdoteForm extends React.Component {
  handleSubmit = () => async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    const newAnecdote = await anecdoteService.createAnecdote(content)
    this.props.createAnecdote(newAnecdote)
    this.props.setNotification(`You submitted an anecdote: '${content}'`)
    setTimeout(() => {
      this.props.clearNotification()
    }, 5000)
    e.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit()}>
          <div><input name='anecdote'/></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

const ConnectedAnecdoteForm = connect((state) => {
  return {
    notification: state.notification
  }
}, {
  createAnecdote, clearNotification, setNotification
})(AnecdoteForm)

export default ConnectedAnecdoteForm
