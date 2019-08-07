import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Components/layout/header';
import './App.css';
import AddTodo from './Components/AddTodo.js';
import Todos from './Components/Todos.js';
import About from './Components/pages/About';
import axios from 'axios';
class App extends React.Component {
  state = {
    todos: []
  }

  componentDidMount() {
    axios.get('https://jsonplaceholder.typicode.com/todos?_limit=10').then(res => this.setState({ todos: res.data }))
  }
  // Togggle
markComplete = (id) => {
  this.setState({ todos: this.state.todos.map(todo => {
    if(todo.id === id) {
      todo.completed = !todo.completed 
    }
    return todo;
  }) });  
}

//Delete Todo
delTodo = (id) => {
 this.setState({ todos:  [...this.state.todos.filter(todo => todo.id
  !== id)] });
}
// Add Todo
addTodo = (title) => {
  const newTodo = {
    id: 4,
    title, 
    completed: false
  }
  this.setState({  todos: [...this.state.todos, newTodo] });
}

render() {
  return (
    <Router>
    <div className="App">
    <div className="contianer">
    <Header />
    <Route exact path="/" render={props => (
      <React.Fragment>
  <AddTodo addTodo={this.AddTodo} />
    <Todos todos={this.state.todos} markComplete={this.markComplete}
    delTodo={this.delTodo}/>
      </React.Fragment>
    )} /> 
  <Route path ="/about" component={About} />


  
    </div>    
    </div>
    </Router>

  );
}}
export default App;
