import React,{ useState, useEffect, useContext} from 'react'
import { getGlasses } from '../api'
import { AiOutlineArrowUp } from 'react-icons/ai';
import { AppContext } from './Context';
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useSearchParams,useLoaderData } from 'react-router-dom'
import Footer from '../components/Footer';

export function loader(){
  return getGlasses()
}

const Home = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const glasses = useLoaderData()
  const filteredData = glasses.filter(item => item.type === 'featured' ).slice(2)

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
  
  const recommendedData = glasses.filter(item => item.type === 'recommended' )

  const recommendedElements = recommendedData.map(glass => {
    const { category , id, imageUrl , name , price} = glass;

    return (
      <Link 
        key={id}
        to={`/recommended/${id}`}
        state={{ 
          search: searchParams.toString()
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
    <div className="home-container">
      <div className="home-representative">
        <p className="title">
          <span>See</span> everything <br /> with <span>Clarity</span>
        </p>
        <p className="description">
          Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit. Omnis voluptatibus <br /> id quidem esse voluptatum sit mollitia ut <br />libero repudiandae soluta.
        </p>
        <Link 
          className='shop-now' 
          to="/shop"
        >
          Shop Now
          <span>
            <AiOutlineArrowRight 
              className='arrow-right'
            />
          </span>
        </Link>
      </div>
      
      <div className="featured-products">
        <div className="featured-header">
          <p className="products-title">
            Featured Products
          </p>
          <Link 
            className='all-featured-items' 
            to="/featured"
          >
            See All
          </Link>
        </div>

        <div className="featured-items">
          {glassElements}
        </div>
      </div>

      <div className="recommended-products">
        <div className="recommended-header">
          <p className="products-title">
            Recommended Products
          </p>
          <Link 
            className='all-recommended-items' 
            to="/recommended"
          >
            See All
          </Link>
        </div>
        
        <div className="recommended-items">
          {recommendedElements}
        </div>
      </div>
      <div className="move-to-top">
        <a href='#'><AiOutlineArrowUp /></a>
      </div>
      <Footer />
    </div>
  )
}

export default Home

