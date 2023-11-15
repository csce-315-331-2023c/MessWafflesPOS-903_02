import React from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { LinkContainer } from "react-router-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "../App";

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const role = React.useContext(RoleContext);
    return (
        <>
            <header>
                <Navbar>
                    <LinkContainer to="/">
                        <Navbar.Brand>Mess Waffles</Navbar.Brand>
                    </LinkContainer>
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/cashier">
                            <Nav.Link>Cashier</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/manager">
                            <Nav.Link>Manager</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Nav.Link>Login</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
