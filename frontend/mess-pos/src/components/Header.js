import React from 'react';
import "./Header.css";
import {Outlet, Link} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavbarBrand from 'react-bootstrap/esm/NavbarBrand';
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
  return (
    <>
      <header>
        <Navbar>
          <LinkContainer to="/"><Navbar.Brand>Mess Waffles</Navbar.Brand></LinkContainer>
          <Nav>
            <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
            <LinkContainer to="/cashier"><Nav.Link>Cashier</Nav.Link></LinkContainer>
            <LinkContainer to="/manager"><Nav.Link>Manager</Nav.Link></LinkContainer>
            <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
          </Nav>
        </Navbar>
      </header>
      <Outlet />
    </>

  )
}

export default Header;