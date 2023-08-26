import React,{ useContext} from 'react'
import { getGlass } from '../api'
import { AppContext } from './Context'
import { Link,useParams, useLocation,useLoaderData } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function loader({ params }){
  return getGlass(params.id)
}

const FeaturedDetail = () => {

  const { setItemId,length, setLength,clearBasket,setClearBasket,status,setStatus,size, setSize,detailStatus, setDetailStatus,setArray,setDeleteArray,setRemovePrice,color, setColor } = useContext(AppContext)

  const location = useLocation()

  const [formData, setFormData] = React.useState(
    {
      adjustSize: "-size-"
    }
  )

  const detail = useLoaderData()

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
    setDetailStatus((prev) => [...prev,e.target])
  
    e.target.style.display = 'none'
    e.target.nextElementSibling.style.display = 'block'
    
    setSize(formData.adjustSize)
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
  
    e.target.style.display = 'none'
    e.target.previousElementSibling.style.display = 'block';

    setArray([])
    setDeleteArray([])
    setRemovePrice([])
  }

  function handleChange(event) {
      const {name, value, type, checked} = event.target
      setFormData(prevFormData => {
          return {
              ...prevFormData,
              [name]: value
          }
      })
  }

  function handleSubmit(event) {
      event.preventDefault()
  }

  function changeColor(e){
    if(e.target.classList.contains('color')){
      const target = e.target.parentElement.parentElement.previousElementSibling;
      if(e.target.dataset.id === 'red'){
        target.src = 'https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2F7l3FMZqY8JdfssalDgx2?alt=media&token=be15689c-e12c-4829-9d78-32395ef1e3f7'
        setColor('red')
      }
      if(e.target.dataset.id === 'yellow'){
        target.src = 'https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FaubOenOJu42CNp4zXTLX?alt=media&token=1d5fd281-b9cc-499b-94a5-225273b1eabc'
        setColor('yellow')
      }
      if(e.target.dataset.id === 'purple'){
        target.src = 'https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FLIu8tS4yHSU28Xi8BXCj?alt=media&token=31e796ad-dbd6-4e4f-a8a9-192f5158684a'
        setColor('purple')
      }
      if(e.target.dataset.id === 'black'){
        target.src = 'https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FALz5M4DI7MF7CdZrq3gS?alt=media&token=8d33ea34-2de3-466b-9b3d-27015e9cd540'
        setColor('black')
      }
      if(e.target.dataset.id === 'orange'){
        target.src = 'https://firebasestorage.googleapis.com/v0/b/salinaka-ecommerce.appspot.com/o/products%2FcLGc3mcbZrK3Tl3yJ3xW?alt=media&token=44f74e92-f2ca-4af3-82f6-7a3bcace7f7a'
        setColor('orange')
      }
    }
  }

  const search = location.state?.search && location.state?.search;
  const name = location.state?.name && location.state?.name;

  return (
    <div className="details-container">
      <Link
          to={`..${search}`}
          relative="path"
          className="back-button"
      >
        &larr; <span>Back to {name} items</span>
      </Link>
            
      {detail && (
          <div className="detailed-items">
              <img src={detail.imageUrl} />
              <div id={detail.id} className="detail-elements">
                <p className="nickname">
                  { detail.category }
                </p>
                <p className="main-name">
                  { detail.name }
                </p>
                <p className="descriptionn">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias earum veniam cum sit non in delectus rem consequuntur! Voluptas, reiciendis.
                </p>
                <hr />

                <form onSubmit={handleSubmit}>
                  <label htmlFor="adjustSize">Lens Width and Frame Size</label>
                  <br />
                  <select 
                      id="adjustSize" 
                      value={formData.adjustSize}
                      onChange={handleChange}
                      name="adjustSize"
                  >
                    <option value={formData.adjustSize}>{formData.adjustSize}</option>
                    <option value="28 mm">28 mm</option>
                    <option value="36 mm">36 mm</option>
                    <option value="42 mm">42 mm</option>
                  </select>
                  {/* <div class="color-item" role="presentation" style="background-color: rgb(255, 141, 10);"></div> */}
                </form>
                <p className="choose">
                  Choose color
                </p>
                <div 
                  className="colors-container"
                  onClick={changeColor}
                >
                  <div 
                    class="color"  
                    style={{backgroundColor: "red"}}
                    data-id="red"
                  >
                  </div>
                  <div 
                    class="color"  
                    style={{backgroundColor: "yellow"}}
                    data-id="yellow"
                  >
                  </div>
                  <div 
                    class="color"  
                    style={{backgroundColor: "purple"}}
                    data-id="purple"
                  >
                  </div>
                  <div 
                    class="color" 
                    style={{backgroundColor: "black"}}
                    data-id="black"
                  >
                  </div>
                  <div 
                    class="color"  
                    style={{backgroundColor: "orange"}}
                    data-id="orange"
                  >
                  </div>
                </div>
                <p className="main-price">
                  { `$${detail.price}.00` }
                </p>
                <div className='buttons'>
                  <button 
                    className="add-to-baskett"
                    id={detail.id}
                    // onClick={()=>addToBasket(1)}
                    onClick={addToBasket}
                  >
                    Add to basket
                  </button>
                  <button 
                    className="remove-from-baskett"
                    onClick={removeFromBasket}
                  >
                    Remove from basket
                  </button>
                </div>
              </div>
          </div>
      ) }
      <ToastContainer />
    </div>
  )
}

export default FeaturedDetail