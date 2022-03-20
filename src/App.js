import React from 'react'

import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelves from './components/Shelves/shelves';
import SearchResult from './components/searchResult/searchResult';
import {Routes,Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Categories from './components/Categories/Categories';

class BooksApp extends React.Component {
 
  state = {
    shelfs:[{
      id:1,
      name:"currentlyReading",
      Books:[]
    },
    {
      id:2,
      name:"wantToRead",
      Books:[]
    },
    {
      id:3,
      name:"read",
      Books:[]
    }
  ],

  CategoriesNames:{},
  Books:[],
  shelfBooks:[],
    showSearchPage: false,
    noSearchResult:false
  }

  checkShelf=(shelfs,book)=>{
      let shelfBooks
      shelfs.map(shelf=>{
        if(shelf.name === book.shelf){
          shelf.Books.push(book);
          return shelf;
        }
      })
      shelfBooks=[...(shelfs[0].Books),...(shelfs[1].Books),...(shelfs[2].Books)];
      this.setState({
        shelfBooks
      })
     return shelfs;  
   
  }

  checkBook=(books,shelfs)=>{
    books.map(book=>{
      shelfs =this.checkShelf(shelfs,book);
       this.setState({
         shelfs
       })
       return true;
   });
  }
  removebook=(shelfs,book)=>{
    let newshelf;
    let newshelfs= shelfs.map(shelf =>{
       if(shelf.name === book.shelf)
       {newshelf=shelf.Books.filter(sbook => sbook.id !== book.id);
        shelf.Books=newshelf; 
         }    
    return shelf;
     })
     return newshelfs;
  }

  getSearchResult=async(shelfBooks,value)=>{
    let searchResult=await (BooksAPI.search(value));
  
    if (Array.isArray(searchResult)){
      let searchBooks=searchResult.map(result => {
      let book=(shelfBooks.filter(book=>book.id === result.id));
      if(book.length > 0){
        result.shelf = book[0].shelf
      }
      else{
        result.shelf="none";
      }
      return result;
      });
      this.setState({Books:searchBooks,noSearchResult:false})
    }
    else{
      this.setState({Books:[],noSearchResult:true });
    }
   } 
  componentDidMount = async()=>{
    const books= await BooksAPI.getAll();
    let shelfs=this.state.shelfs;
    let CategoriesNames=this.state.CategoriesNames;
    this.checkBook(books,shelfs);
    this.setState({
      CategoriesNames:this.getCategoryName(books,CategoriesNames)
    })
  
  }

  getCategoryName=(books,CategoriesNames)=>{
    books.map(async book=>this.handleBookCategory(book,CategoriesNames));
   return CategoriesNames;
   }
  handleBookCategory=async(book,CategoriesNames)=>{
    
      if(book.categories !== undefined){
        let BookCategory=((book.categories)[0]).toUpperCase();
        if(!(BookCategory in CategoriesNames))
        {CategoriesNames[BookCategory]={Books:[book]};
      }
      else{
        CategoriesNames[BookCategory].Books.push(book);
      }
    }
      else{
        book.categories=["Others"];
        if("Others" in CategoriesNames)
        CategoriesNames["Others"].Books.push(book);
        else
        CategoriesNames["Others"]={Books:[book]};
        await BooksAPI.updateCategory(book,["Others"]);
      }
    
    return CategoriesNames;
  }
  
  handleChange=async (value,id)=>{

    let newshelfs=this.state.shelfs ;
    let shelfs=[...newshelfs];
    let book= await (BooksAPI.get(id));
     shelfs=(this.removebook(shelfs,book))
     book.shelf=value;
    shelfs=this.checkShelf(shelfs,book)
    await BooksAPI.update(book,value);
    this.setState({
      shelfs  })
   }
  
 
  handleInputChange=async (e)=>{
     let shelfBooks=[...this.state.shelfBooks];
  if(e.target.value !== ""){
    this.getSearchResult(shelfBooks,e.target.value );
  }
  else{
    this.setState({
      Books:[],
      noSearchResult:false
    })
  }}


  HandleCategoryChange=async(value,id)=>{
      let newCategories={...this.state.CategoriesNames} ;
      let book= await (BooksAPI.get(id));
      newCategories[((book.categories)[0].toUpperCase())].Books= newCategories[((book.categories)[0].toUpperCase())].Books.filter(sbook => sbook.id !== book.id );
      book.categories=[value];
      newCategories[value].Books.push(book);
      this.setState({
        CategoriesNames:newCategories
      })
      await BooksAPI.updateCategory(book,[value]);
    }

  handlemount=()=>{
      this.setState({
        Books:[]
      })
    }


  render() {
    return (
      <div className="app">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Shelves handlemount={this.handlemount} shelfs={this.state.shelfs} handleChange={this.handleChange}/>}/>
          <Route  path="/categories" element={<Categories  Categories={this.state.CategoriesNames} HandleCategoryChange={this.HandleCategoryChange} />}/>
          <Route path="/search" element={<SearchResult  handleInputChange={this.handleInputChange} noSearchResult={this.state.noSearchResult} handleChange={this.handleChange} Books={this.state.Books}/>}/>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
