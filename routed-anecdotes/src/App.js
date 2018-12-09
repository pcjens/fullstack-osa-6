import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Table, Grid, Card, Image, Form, Message, Menu, Icon } from 'semantic-ui-react'

const Nav = () => {
  return (
    <Menu pointing secondary>
      <Link to='/'><Menu.Item link active={window.location.pathname === '/'}>Anecdotes</Menu.Item></Link>
      <Link to='/create'><Menu.Item link active={window.location.pathname === '/create'}>Create New</Menu.Item></Link>
      <Link to='/about'><Menu.Item link active={window.location.pathname === '/about'}>About</Menu.Item></Link>
    </Menu>
  )
}

const Notification = ({message}) => {
  if (message.length > 0) {
    return (
      <Message success>
        {message}
      </Message>
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
        <Card>
          <Image src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Edsger_Wybe_Dijkstra.jpg/440px-Edsger_Wybe_Dijkstra.jpg' />
          <Card.Content>
            <Card.Header>Edsger W. Dijkstra</Card.Header>
            <Card.Meta>
              <span>Known for Dijkstra's Algorithm</span>
            </Card.Meta>
            <Card.Description>Dijkstra is a famous software engineer.</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Icon name='location arrow' /> Route not found.
          </Card.Content>
        </Card>
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
        See <a href='https://github.com/mluukkai/routed-anecdotes'>https://github.com/mluukkai/routed-anecdotes</a> for the original source code,
        and <a href='https://github.com/pcjens/fullstack-osa-6'>https://github.com/pcjens/fullstack-osa-6</a> for this modified version.
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
        <h2>Create a new anecdote:</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Input label='Content' name='content' value={this.state.content} onChange={this.handleChange} />
          <Form.Input label='Author' name='author' value={this.state.author} onChange={this.handleChange} />
          <Form.Input label='URL for more info' name='info' value={this.state.info} onChange={this.handleChange} />
          <Form.Button>Create</Form.Button>
        </Form>
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
      notification: `New anecdote created: ${anecdote.content}`
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
            <Nav />
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
