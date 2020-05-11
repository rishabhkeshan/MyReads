import React, { Component } from 'react';
import Book from './Book';

class BookCategory extends Component {
  render() {
    const { shelfName, books, newShelf } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  newShelf={newShelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookCategory;