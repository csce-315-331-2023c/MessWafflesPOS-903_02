import React, { useEffect } from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { LinkContainer } from "react-router-bootstrap";

import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "../App";
import { TranslateScript } from "./Translation";

const Header = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const role = React.useContext(RoleContext);

    TranslateScript();

    return (
        <>
            <header>
                <Navbar>
                    <LinkContainer to="/">
                        <Navbar.Brand className="notranslate">
                            Mess Waffles
                        </Navbar.Brand>
                    </LinkContainer>
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        {isAuthenticated && role === "cashier" && (
                            <>
                                <LinkContainer to="/cashier">
                                    <Nav.Link>Cashier</Nav.Link>
                                </LinkContainer>
                            </>
                        )}

                        {isAuthenticated && role === "manager" && (
                            <>
                                <LinkContainer to="/manager">
                                    <Nav.Link>Manager</Nav.Link>
                                </LinkContainer>
                            </>
                        )}
                        <LinkContainer to="/customer">
                            <Nav.Link>Customer</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/customer">
                            <Nav.Link>Customer</Nav.Link>
                        </LinkContainer>

                        <Nav.Link onClick={() => loginWithRedirect()}>
                            Login
                        </Nav.Link>

                        <Nav.Link
                            onClick={() =>
                                logout({
                                    logoutParams: {
                                        returnTo: window.location.origin,
                                    },
                                })
                            }
                        >
                            Logout
                        </Nav.Link>
                    </Nav>
                </Navbar>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
