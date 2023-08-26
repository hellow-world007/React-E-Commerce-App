import React from 'react'
import { Outlet,useLoaderData } from "react-router-dom"
import { getGlasses } from '../api'
import Navbar from "./Navbar"

export function loader(){
  return getGlasses()
}

const Layout = () => {

  const glasses = useLoaderData()
  
  return (
    <div className="app-container">
        <Navbar glasses={glasses}/>
          <main>
              <Outlet />
          </main>
      </div>
  )
}

export default Layout