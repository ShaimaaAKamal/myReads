import React,{Fragment} from 'react';
import Categoryshelf from '../shelf/categoryShelf';

function Categories(props){
const {Categories}=props;

//   useEffect(() => handlemount, []);

return(
    <div className="list-books">
            <div className="list-books-content">
              <div>
                <Fragment>
                  {
                  Categories.map(Category=>{
                      return <Categoryshelf key={Category.id} Category={Category} />
                    })
                  }
                </Fragment>
              </div>
            </div>
          </div>
)
}
export default Categories;
