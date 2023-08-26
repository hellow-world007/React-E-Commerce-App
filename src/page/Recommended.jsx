import { getGlasses } from '../api'
import { Link, useSearchParams,useLoaderData } from 'react-router-dom'

export function loader(){
  return getGlasses()
}

const Recommended = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const glasses = useLoaderData()

  const filteredData = glasses.filter(item => item.type === 'recommended' )

  const glassElements = filteredData.map(glass => {
    const { category , id, imageUrl , name , price} = glass;

    return (
      <Link 
        key={id}
        to={`/recommended/${id}`}
        state={{ 
          search: searchParams.toString(),
          name: 'recommended'
        }}
      >
        <div key={ id } className="glass-item">
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
            </div>
        </div>
      </Link>
    )
  })

  return (
    <div className="recommended-container">
      <div className="recommended-representative">
        <h1>Recommended <br /> Products</h1>
      </div>

      <div className="recommended-items">
        {glassElements}
      </div>
    </div>
  )
}

export default Recommended