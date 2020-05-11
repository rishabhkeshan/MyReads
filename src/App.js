import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import BookCategory from './BookCategory';
import newBook from './newBook';
import * as BooksAPI from './BooksAPI';
import './App.css';

class App extends Component {
  state = {
    books: []
  }

  componentDidMount() {

    BooksAPI.getAll().then(books => {
      this.setState({ books });
    })
  }

  newShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      const books = this.state.books.map(currentBook => {
        if (currentBook.id === book.id) {
          currentBook.shelf = shelf;
        };

        return currentBook;
      });

      if (books.filter(currentBook => currentBook.id === book.id).length === 0) {
        book.shelf = shelf;
        books.push(book);
      }
      this.setState({ books });
    });
  }

  BookStatus = () => {
    const Category = [
      ['Currently Reading', 'currentlyReading'],
      ['Want to Read', 'wantToRead'],
      ['Read', 'read']
    ]

    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          {Category.map((shelf, index) => (
            <BookCategory
              key={index}
              newShelf={this.newShelf}
              shelfName={shelf[0]}
              books={this.state.books.filter(b => b.shelf === shelf[1])} />
          ))}
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      );
  }

  render() {
    return (
      <div>
        <Route exact path='/' render={this.BookStatus}/>
        <Route path='/search' render={({ history }) => (
          <newBook
            addedBooks={this.state.books}
            onAddingBook={(book, shelf) => {
              this.newShelf(book, shelf);
              history.push('/');
            }}
          />
        )}/>
      </div>
    );
  }
}

export default App;
