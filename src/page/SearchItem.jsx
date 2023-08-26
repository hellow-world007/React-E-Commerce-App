import React,{ useState, useEffect, useContext} from 'react'
import { getGlasses } from '../api'
import { AppContext } from './Context'
import { Link,Outlet, useSearchParams,useLoaderData } from 'react-router-dom'

export function loader(){
  return getGlasses()
}

const SearchItem = () => {

const { inputValue, setInputValue,isSubmit, setIsSubmit,itemId, setItemId,length, setLength,clearBasket,setClearBasket,status,setStatus,loading,setLoading } = useContext(AppContext)

const [searchParams, setSearchParams] = useSearchParams()

const glasses = useLoaderData()
  const filteredData = glasses.filter(item => item.name === inputValue )
  
  const addToBasket = (e) => {  
    
    const ID = e.target.parentElement.parentElement.id;
    setItemId(prevState => {
      return [...prevState, `${ID}`]
    })
    
    setLength(length + 1)
    setClearBasket(false)
    console.log('add')
    e.target.classList.add('add')
    e.target.nextElementSibling.classList.add('remove')
    e.target.parentElement.previousElementSibling.firstChild.style.border = '1px solid #34495e'
    e.target.parentElement.previousElementSibling.lastChild.style.border = '1px solid #34495e'
    e.target.nextElementSibling.style.border = '1px solid #34495e'
    setStatus(e.target)
  }

  function removeFromBasket(e){
    setLength(length - 1)
    setItemId(prev => {
      return prev.filter(item => item !== e.target.parentElement.parentElement.id)
    })
    console.log('remove')
    e.target.classList.remove('remove')
    e.target.previousElementSibling.classList.remove('add')
    e.target.parentElement.previousElementSibling.firstChild.style.border = 'none'
    e.target.parentElement.previousElementSibling.lastChild.style.border = 'none'
    e.target.previousElementSibling.style.border = 'none'
  }

  const searchElements = filteredData.map(glass => {
    const { category , id, imageUrl , name , price} = glass;
    return (
      <div key={ id } id={ id } className="glass-item">
        <Link
          key={id} 
          to={`/search/${id}`}
          state={{ 
            search: searchParams.toString(),
            name: 'search'
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
                  { price }
              </p>
          </div>
        </Link>
        <div className='buttons'>
          <button 
            className="add-to-basket"
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
    <div className="search-container">
      <div className="search-representative">
        <p className="after-search"
          style={{ color: 'purple' }}
        >
          { !isSubmit && `Search your favourite items`}
        </p>
        <p className="after-search"
          style={{ color: 'steelblue' }}
        >
          { isSubmit && inputValue && filteredData.length > 0 && `Found 1 product with keyword ${inputValue}`}
        </p>
        <p className="after-search"
          style={{ color: 'tomato' }}
        >
          { isSubmit && filteredData.length <= 0 && `No products found for your keyword ${inputValue}`}
        </p>
      </div>

      <div className="search-items">
        { isSubmit && searchElements }
      </div>
    </div> 
  )
}

export default SearchItem