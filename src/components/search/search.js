import React ,{Fragment}from 'react';
import Book from '../book/book';
function Search(props){
    const books=props.result;
return (
    <Fragment>
                  {books.map(book=>{
                      return <li key={book.id}><Book book={book} handleChange={props.handleChange} shelfType={book.shelf}/></li>
                  })}    </Fragment>
)
}
export default Search;
