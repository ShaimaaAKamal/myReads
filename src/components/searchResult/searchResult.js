import React from 'react';
import Search from '../search/search';
function SearchResult(props){
    const {handleInputChange,noSearchResult,Books,handleChange}=props;

 return(
    <div className="search-books">
    <div className="search-books-bar">
      <div className="search-books-input-wrapper">
        <input type="text" placeholder="Search by title or author" onChange={handleInputChange}/>

      </div>
    </div>
    <div className="search-books-results">
    {noSearchResult && <div className='text-white bg-secondary text-center p-5'>There are no books related to that search Key</div>}

    {!noSearchResult &&   <ol className="books-grid">
    <Search result={Books} handleChange={handleChange} />
    </ol>}
    </div>
  </div>
 )
}
export default SearchResult;