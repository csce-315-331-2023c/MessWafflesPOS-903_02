
import React from 'react';
import "../App.css";
import { Outlet } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'
import DarkMode from './DarkMode';
import FontSizing from './FontSizing';

const Header = () => {
  return (
    <>
      <header>
        <Navbar>
          
          <LinkContainer to="/"><Navbar.Brand><div>Mess Waffles</div></Navbar.Brand></LinkContainer>
          <Nav>
            <LinkContainer to="/" className='link-container'><Nav.Link><div>Home</div></Nav.Link></LinkContainer>
            <LinkContainer to="/cashier" className='link-container'><Nav.Link><div>Cashier</div></Nav.Link></LinkContainer>
            <LinkContainer to="/manager" className='link-container'><Nav.Link><div>Manager</div></Nav.Link></LinkContainer>
            <LinkContainer to="/login"><Nav.Link className='link-container'><div>Login</div></Nav.Link></LinkContainer>
          </Nav>
          <DarkMode/>
          <FontSizing/>
        </Navbar>
      </header>
      <Outlet />
    </>

  )
}

export default Header;