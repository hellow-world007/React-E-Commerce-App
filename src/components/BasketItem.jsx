import React,{ useContext,useState } from 'react'
import { AppContext } from '../page/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BasketItem = ({ glass,quantity,removeFromBasket,setQuantity,priceArray,array,setArray,click,setClick,size,color }) => {

  const { glasses, setGlasses,itemId, setItemId,length, setLength,status,setStatus,deleteArray,setDeleteArray,removePrice,setRemovePrice,detailStatus, setDetailStatus } = useContext(AppContext)

  const [ q,setQ ] = useState(1)
  
  const increase = (size) => {
    setQ(q + 1)
    setQuantity(quantity + 1)
    setArray(prev => {
        return [...prev, Number(size)]
    })
  }

  const decrease = (size) => {
    setQ(q - 1)
    setQuantity(quantity - 1)
    setDeleteArray(prev => {
        return [...prev, Number(size)]
    })
  }

  function removeFromBasket(ID){
    setLength(length - 1)
    setItemId(prev => {
      return prev.filter(item => item !== ID)
    })
    setClick(true)
    
    toast('Item removed from basket!', {
        position: toast.POSITION.TOP_CENTER,
        className: 'toast-message'
    });
    
    const filteredStatus = status.filter(st => st.id === ID)
    if(filteredStatus.length > 0){
        filteredStatus[0].style.display = 'block'
        filteredStatus[0].nextElementSibling.style.display = 'none'
        filteredStatus[0].parentElement.previousElementSibling.firstChild.style.border = 'none'
        filteredStatus[0].parentElement.previousElementSibling.lastChild.style.border = 'none'
        filteredStatus[0].style.border = 'none'
    }
    
    const filteredDetailStatus = detailStatus.filter(st => st.id === ID)
    if(filteredDetailStatus.length > 0){
        filteredDetailStatus[0].style.display = 'block'
        filteredDetailStatus[0].nextElementSibling.style.display = 'none'
    }

    setStatus(prev =>
        prev.filter(item => {
          return item.id !== ID;
        }),
    );
    
  }

  function removePriceAlso(size){
    setRemovePrice(prev => {
        return [...prev, Number(size)]
    })
  }

  return (
    <>
    <div id={glass.id} className="single-item">
        <div className="button-sider">
            <button 
                className='plus'
                id={glass.id}    
                onClick={()=>increase(glass.price)}
            >
                +
            </button>
            <button 
                className='minus'
                id={glass.id}
                onClick={()=>decrease(glass.price)}
                disabled={q === 1}
            >
                -
            </button>
        </div>
        
        <div className="item-image">
            <img src={glass.imageUrl} alt="image nahi milega" />
        </div>

        <div className="name--quantity">
            <p className="name">{glass.name}</p>
            <p>Quantity</p>
            <p className="quantity">{q}</p>
        </div>

        <div className="sizes">
            <p>Size</p>
            <p 
              className="size"
              style={{color: '#222222',fontSize: '1rem',fontWeight: 'bold'}}
            >
                {`${size ? size : '28 mm'}`}
            </p>
        </div>

        <div className="colors">
            <p>Color</p>
            <p 
               className='colorr'
               style={{backgroundColor: `${color ? color : 'red'}`}}
            >
            </p>
        </div>

        <p className="amount-per-item">
            {`$${glass.price * q}.00`}
        </p>

        <button 
            className='remove-item'
            onClick={()=>{
                removeFromBasket(glass.id)
                removePriceAlso((glass.price * q) - glass.price)
            }}
        >
            &times;
        </button>
    </div>
    <ToastContainer />
    </>
  )
}

export default BasketItem