import React from 'react';

function Book(props){
    const{id,authors,title,imageLinks}=props.book;
        const Type=props.Type;  
        const background =imageLinks ?`url(${imageLinks.thumbnail})`: "none";

return(
    <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193,backgroundImage:background}}></div>
      <div className="book-shelf-changer">
      {props.displayShelf && ( <select defaultValue={Type} onChange={(e)=>props.handleChange(e.target.value,id)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading"  >Currently Reading</option>
          <option value="wantToRead" >Want to Read</option>
          <option value="read" >Read</option>
          <option value="none" >None</option>
        </select>)}
      {!props.displayShelf && 
 <select defaultValue={Type} onChange={(e)=>props.handleChange(e.target.value,id)}>
 <option value="move" disabled>Move to...</option>
 {props.CategoryNames.map(CategoryName =>{
      return <option value={CategoryName} key={CategoryName}> {CategoryName }</option>
 })}
</select>
      }
       
      </div>
    </div>
    <div className="book-title">{title}</div>
    <div className="book-authors">{authors !== undefined && authors.join(" , ")}</div>
  </div>
)
}
export default Book;
