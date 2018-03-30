import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import escapeRegExp from 'escape-string-regexp';


import {
  Link,
  Route
} from 'react-router-dom'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    query: ''
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) => {
      this.setState({books})
    })
  }

  handleSelectValue = (e, id) => 
    this.setState({
        books: this.state.books.map( book => {
          if(id === book.id){
            return {
              ...book,
              shelf: e.target.value
            }
          }
          return book
        })
      })

  updateQuery = (query) => {
      this.setState({query: query})
      console.log('Update:', query)
  }

  render() {
    const {books, query} = this.state
    let showingBooks;

    if(query){
      const match = new RegExp(escapeRegExp(query), 'i')
      showingBooks = books.filter((book) => match.test(book.title) || match.test(book.authors))
    } else {
      showingBooks = books
    }

    return (
      <div className="app">
        <Route path='/search' render={() => (

          <div className="search-books">
            <div className="search-books-bar">
              <Link to='/' className="close-search" >Close</Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input 
                  type="text"
                  value={query} 
                  onChange={(event) => this.updateQuery(event.target.value)}
                  placeholder="Search by title or author"/>
              </div>
            </div>
              
            <div className="search-books-results">
              <ol className="books-grid">
              {showingBooks.map(book => 
              
                query &&
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                          <div className="book-shelf-changer">
                            
                            <select onChange={ event => this.handleSelectValue(event, book.id) } value={book.shelf}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                            
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                    </div>
                  </li>

              )}
              </ol>
              {console.log('====>', showingBooks)}
            </div>
          </div>

        )}/>
        <Route exact path='/' render={() => ( 
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                
                <div className="bookshelf">  
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (
              
                      book.shelf === 'currentlyReading' &&
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  
                                  <select onChange={ event => this.handleSelectValue(event, book.id) } value={book.shelf}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                  
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                        
                      
                    ))}
                      
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">  
                  <h2 className="bookshelf-title">Want To Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (
                      book.shelf === 'wantToRead' &&
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select onChange={ event => this.handleSelectValue(event, book.id) } value={book.shelf}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                    ))}
                    </ol>
                  </div>
                </div>

                <div className="bookshelf">  
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.map((book) => (
                      book.shelf === 'read' &&
                        <li key={book.id}>
                          <div className="book">
                            <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                <div className="book-shelf-changer">
                                  <select onChange={ event => this.handleSelectValue(event, book.id) } value={book.shelf}>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.authors}</div>
                          </div>
                        </li>
                    ))}
                    </ol>
                  </div>
                </div>
        
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
            
          </div>

        )}/>
      </div>

    )

  }
}

export default BooksApp
