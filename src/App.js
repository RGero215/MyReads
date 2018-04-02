import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search';
import BookList from './BookList'


import {Route} from 'react-router-dom'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    books: [],
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  handleChange(book, shelf) {

    book.shelf = shelf; 
    BooksAPI.update(book, shelf)
      .then(
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id)
        }))
      )
      .then(this.setState(state => ({books: state.books.concat([book])})));
  }

  render() {
    const {books} = this.state

    return (
      <div className='app'>
        <Route 
          exact path='/search' 
          render={({history}) => (
            <Search books={books} handleChange={this.handleChange} /> 
          )}/>

        <Route
          exact
          path="/"
          render={({ history }) => (
            <BookList books={books} handleChange={this.handleChange} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
