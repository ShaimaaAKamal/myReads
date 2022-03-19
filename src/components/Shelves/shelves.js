import React,{Fragment,useEffect} from 'react';
import Bookshelf from '../shelf/Bookshelf';

function Shelves(props){
const {shelfs,handleChange,handlemount}=props;

  useEffect(() => handlemount, []);

return(
    <div className="list-books">
            <div className="list-books-content">
              <div>
                <Fragment>
                  {
                  shelfs.map(shelf=>{
                      return <Bookshelf key={shelf.id} shelf={shelf} handleChange={handleChange} />
                    })
                  }
                </Fragment>
              </div>
            </div>
          </div>
)
}
export default Shelves;
