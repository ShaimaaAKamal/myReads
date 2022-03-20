import React,{Fragment} from 'react';
import Categoryshelf from '../shelf/categoryShelf';

function Categories(props){
const {Categories}=props;
let CategoryNames= Object.keys(Categories);

return(
    <div className="list-books">
            <div className="list-books-content">
              <div>
                <Fragment>               
                  {
                    Object.entries(Categories).map((value,key)=>{
                      let Category={
                        id:key+1,
                        name:value[0],
                        Books:value[1].Books
                      };
                      return <Categoryshelf key={Category.id} Category={Category} CategoryNames={CategoryNames} HandleCategoryChange={props.HandleCategoryChange}/>
                    })
                  }
                </Fragment>
              </div>
            </div>
          </div>
)
}
export default Categories;
