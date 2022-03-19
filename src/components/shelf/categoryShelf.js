import React from 'react';
import Book from '../book/book';


function Categoryshelf (props) {
    const {name,Books}=props.Category;
        return (
            <div className="bookshelf mt-5">
            <h2 className="bookshelf-title">{name}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {Books.map(book=>{
                      return <li key={book.id}><Book book={book}  displayShelf={false} Type={name}/></li>
                  })}
              </ol>
            </div>
          </div>
        );
}
 
export default Categoryshelf;