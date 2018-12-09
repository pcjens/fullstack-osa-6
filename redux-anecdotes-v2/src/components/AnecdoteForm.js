import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { clearNotification, setNotification } from '../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = () => (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    this.props.store.dispatch(createAnecdote(content))
    this.props.store.dispatch(setNotification(`You submitted an anecdote: '${content}'`))
    setTimeout(() => {
      this.props.store.dispatch(clearNotification())
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

export default AnecdoteForm
