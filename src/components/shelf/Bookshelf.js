import React from 'react';
import Book from '../book/book';

const displayType=(id=0,type)=>{
  switch(id){
    case 1 : type="Currently Reading";break;
    case 2 : type="Want to Read";break;
    case 3 : type="Read";break;
    default:break;
  }
  return type
}

function Bookshelf (props) {
    const {id,name,Books}=props.shelf;
    const title=displayType(id,name);
        return (
            <div className="bookshelf mt-2">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {Books.map(book=>{
                      return <li key={book.id}><Book book={book} handleChange={props.handleChange} Type={name} displayShelf={true}/></li>
                  })}
              </ol>
            </div>
          </div>
        );
}
 
export default Bookshelf;