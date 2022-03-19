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
  Categories:[{id:1, name:"Photography",Books:[]},{id:2, name:"History",Books:[]},{id:3, name:"Business",Books:[]},{id:4, name:"Travel",Books:[]},{id:5, name:"Fitness",Books:[]},{id:6, name:"Programming",Books:[]}],
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
  
  componentDidMount = async()=>{
    const books= await BooksAPI.getAll();
    let shelfs=this.state.shelfs;
    this.checkBook(books,shelfs);
    this.getCategoryData();
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



  handleChange=async (value,id)=>{
    let newshelfs=this.state.shelfs;
    let shelfs=[...newshelfs];
    let book= await (BooksAPI.get(id));
     shelfs=(this.removebook(shelfs,book))
    book.shelf=value;
    shelfs=this.checkShelf(shelfs,book)
   await BooksAPI.update(book,value);
    this.setState({
      shelfs  })
   }


 

   getSearchResult=async(shelfBooks,value)=>{
    let searchResult=await (BooksAPI.search(value));
    if (Array.isArray(searchResult)){
      let searchBooks=searchResult.map(result => {
      let book=(shelfBooks.filter(book=>book.id === result.id));
      console.log(book);
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

  
 handlemount=()=>{
      this.setState({
        Books:[]
      })
    }


   getCategoryData=async ()=>{
     let CategoriesNames=['Photography','History',"Business","Travel","Fitness","Programming"];
     CategoriesNames.map(async CategoryName =>{
      let CategoryData=await (BooksAPI.search(CategoryName));
      let Categories=this.state.Categories;
      Categories.map(Category => {
        if(Category.name === CategoryName)
       { Category.Books=[...CategoryData];
        return Category}
      })
      this.setState({
        Categories
      })
     })
   }



  render() {
    return (
      <div className="app">
        <Navbar/>
        <Routes>
          <Route exact path="/" element={<Shelves handlemount={this.handlemount} shelfs={this.state.shelfs} handleChange={this.handleChange}/>}/>
          <Route  path="/categories" element={<Categories  Categories={this.state.Categories} />}/>
          <Route path="/search" element={<SearchResult  handleInputChange={this.handleInputChange} noSearchResult={this.state.noSearchResult} handleChange={this.handleChange} Books={this.state.Books}/>}/>
        </Routes>
      </div>
    )
  }
}

export default BooksApp
