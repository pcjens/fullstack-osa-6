import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Grid, Image } from 'semantic-ui-react'

const Menu = () => {
  const rootStyle = {
    marginTop: '1em',
    marginBottom: '1em',
  }

  const style = {
    color: '#111',
    padding: '0.3em',
    paddingRight: '0.3em',
    paddingLeft: '0.3em',
    textDecoration: 'none',
    fontVariant: 'all-small-caps',
    fontSize: '1.2rem'
  }

  const activeStyle = {
    borderBottom: '1px solid #111'
  }

  return (
    <div style={rootStyle}>
      <NavLink style={style} activeStyle={activeStyle} exact to='/'>anecdotes</NavLink>
      <NavLink style={style} activeStyle={activeStyle} exact to='/create'>create new</NavLink>
      <NavLink style={style} activeStyle={activeStyle} exact to='/about'>about</NavLink>
    </div>
  )
}

const Notification = ({message}) => {
  if (message.length > 0) {
    const style = {
      color: '#295',
      borderColor: '#2b8',
      borderWidth: '1px',
      borderRadius: '3px',
      borderStyle: 'solid',
      padding: '0.3em',
      margin: '0.4em'
    }
    return (
      <div style={style}>
        {message}
      </div>
    )
  } else {
    return (<div></div>)
  }
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h3>{anecdote.content} by {anecdote.author}</h3>
    <p>has {anecdote.votes} votes</p>
    <p>for more info see <a href={anecdote.info}>{anecdote.info}</a></p>
  </div>
)

const AnecdoteList = ({ anecdotes }) => {
  const renderAnecdote = anecdote => (
    <Table.Row key={anecdote.id}>
      <Table.Cell>
        <Link to={'/anecdotes/' + anecdote.id}>{anecdote.content}</Link>
      </Table.Cell>
    </Table.Row>
  )
  return (
    <div>
      <h2>Anecdotes</h2>
      <Table striped celled>
        <Table.Body>
          {anecdotes.map(renderAnecdote)}
        </Table.Body>
      </Table>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <Grid columns={2} relaxed>
      <Grid.Column key='1' floated='left'>
        <p>According to Wikipedia:</p>
        <p>
          <em>An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
            such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
            An anecdote is "a story with a point."</em>
        </p>
        <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
      </Grid.Column>
      <Grid.Column key='2' floated='right'>
        <Image height='200px' src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/440px-Edsger_Wybe_Dijkstra.jpg'/>
      </Grid.Column>
    </Grid>
  </div>
)

const Footer = () => {
  const style = {
    marginTop: '1em',
    fontSize: '0.9rem',
    fontStyle: 'italic'
  }

  return (
    <div style={style}>
      <p>
        Anecdote app for <a href='https://courses.helsinki.fi/fi/TKT21009/121540749'>Full Stack -sovelluskehitys</a>.
      </p>
      <p>
        See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the source code.
      </p>
    </div>
  )
}

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
  }

  render() {
    return(
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            content
            <input name='content' value={this.state.content} onChange={this.handleChange} />
          </div>
          <div>
            author
            <input name='author' value={this.state.author} onChange={this.handleChange} />
          </div>
          <div>
            url for more info
            <input name='info' value={this.state.info} onChange={this.handleChange} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: ''
    }
  }

  addNew = (history) => (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `a new anecdote '${anecdote.content}' created!`
    })
    setTimeout(() => { this.setState({ notification: '' }) }, 10000)
    history.push('/')
  }

  anecdoteById = (id) =>
    this.state.anecdotes.find(a =>  a.id === id)

  vote = (id) => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => a.id === id ? voted : a)

    this.setState({ anecdotes })
  }

  render() {
    return (
      <Container>
        <Router>
          <div>
            <h1>Software anecdotes</h1>
            <Menu />
            <Notification message={this.state.notification} />
            <Route exact path='/' render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}></Route>
            <Route exact path='/anecdotes/:id' render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />}></Route>
            <Route exact path='/about' render={() => <About />}></Route>
            <Route exact path='/create' render={({history}) => <CreateNew addNew={this.addNew(history)}/>}></Route>
            <Footer />
          </div>
        </Router>
      </Container>
    );
  }
}

export default App;
