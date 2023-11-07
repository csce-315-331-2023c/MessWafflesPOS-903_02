import React from 'react'
import "./Header.css"
import {Outlet, Link} from "react-router-dom"

const Header = () => {
  return (
    <>
      <header>
        <h1>Mess Waffles</h1>
        <nav>
          <h2><Link to="/">Home</Link></h2>
          <h2><Link to="/cashier">Cashier</Link></h2>
        </nav>
      </header>
      <Outlet />
    </>

  )
}

export default Header;