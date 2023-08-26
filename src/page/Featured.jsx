import { Link, useSearchParams,useLoaderData } from 'react-router-dom'
import { getGlasses } from '../api'

export function loader(){
  return getGlasses()
}

const Featured = () => {

  const [searchParams, setSearchParams] = useSearchParams()
  
  const glasses = useLoaderData()

  const filteredData = glasses.filter(item => item.type === 'featured' )

  const glassElements = filteredData.map(glass => {
    const { category , id, imageUrl , name , price} = glass;

    return (
      <Link 
        key={id}
        to={`/featured/${id}`}
        state={{ 
          search: searchParams.toString(),
          name : 'featured'
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
    <div className="featured-container">
      <div className="featured-representative">
        <h1>Featured Products</h1>
      </div>

      <div className="featured-items">
        {glassElements}
      </div>
    </div>
  )
}

export default Featured
