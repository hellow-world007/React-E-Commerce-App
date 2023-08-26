import React,{ useState, useEffect, useContext} from 'react'
import { getGlasses } from '../api'
import { AppContext } from './Context'
import Paginate from './Paginate'
import { Link, useSearchParams,useLoaderData } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function loader(){
  return getGlasses()
}

const Shop = () => {

  const { itemId, setItemId,length, setLength,clearBasket,setClearBasket,status,setStatus,loading,setLoading,array,setArray,click,setClick,deleteArray,setDeleteArray,removePrice,setRemovePrice } 
  = useContext(AppContext)

  const glasses = useLoaderData()
  const [searchParams, setSearchParams] = useSearchParams()
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const typeFilter = searchParams.get('type')

  const [ findButton ,setFindButton ] = useState('')

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = glasses.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const previousPage = () => {
    if (currentPage !== 1) {
       setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
      if (currentPage !== Math.ceil(glasses.length / postsPerPage)) {
        setCurrentPage(currentPage + 1);
      }
  };
  
  const addToBasket = (e) => {  
    const ID = e.target.parentElement.parentElement.id;
    setItemId(prevState => {
      return [...prevState, `${ID}`]
    })
    
    toast('Item added to basket!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message'
    });
    
    setLength(length + 1)
    setClearBasket(false)

    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'block'
    e.target.parentElement.previousElementSibling.firstChild.style.border = '1px solid #34495e'
    e.target.parentElement.previousElementSibling.lastChild.style.border = '1px solid #34495e'
    e.target.nextElementSibling.style.border = '1px solid #34495e'
    
    setStatus((prev) => [...prev,e.target])
  }

  function removeFromBasket(e){
    setLength(length - 1)
    setItemId(prev => {
      return prev.filter(item => item !== e.target.parentElement.parentElement.id)
    })
    
    toast('Item removed from basket!', {
      position: toast.POSITION.TOP_CENTER,
      className: 'toast-message'
    });
    
    setArray([])
    setDeleteArray([])
    setRemovePrice([])
  
    e.target.style.display = 'none'
    e.target.previousElementSibling.style.display = 'block'
    e.target.parentElement.previousElementSibling.firstChild.style.border = 'none'
    e.target.parentElement.previousElementSibling.lastChild.style.border = 'none'
    e.target.previousElementSibling.style.border = 'none'
  }
  
  const shopElements = currentPosts.map((glass,index) => {
    const { category , id, imageUrl , name , price } = glass;

    return (
      <div key={ id } id={id} className="glass-item">
        <Link 
            key={id}
            to={`/shop/${id}`}
            state={{ 
              search: searchParams.toString(),
              name : 'shop',
              type: typeFilter
            }}
        >
          <figure>
            <img src={ imageUrl } alt="image not found" />
          </figure>
          <div className="title-category">
            <p className='img-title'>
              { name }
            </p>
            <p className="img-category">
              { category }
            </p>
            <p className="price-category">
              {`$${price}`}
            </p>
          </div>
        </Link>
        <div className='buttons'>
          <button 
            className="add-to-basket"
            id={id}
            // onClick={()=>addToBasket(1)}
            onClick={addToBasket}
          >
            Add to basket
          </button>
          <button 
            className="remove-from-basket"
            onClick={removeFromBasket}
          >
            Remove from basket
          </button>
        </div>
      </div>
    )
  })

  return (
    <div className="shop-container">
      <div className="shop-items">
        {shopElements}
      </div>
      <ToastContainer />
      <div className="pagination">
         {glasses ? (
            <div className="pagination-section">
               <Paginate
                  postsPerPage={postsPerPage}
                  totalPosts={glasses.length}
                  paginate={paginate}
                  previousPage={previousPage}
                  nextPage={nextPage}
               />
            </div>
         ) : (
            <div className="loading">
              Loading...
            </div>
         )}
      </div>
    </div>
  )
}

export default Shop