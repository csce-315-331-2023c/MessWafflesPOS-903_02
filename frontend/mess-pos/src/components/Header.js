// File: Header.js
// Header bar for the website

import React, { useEffect } from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { LinkContainer } from "react-router-bootstrap";
import DarkMode from "./DarkMode";
import FontSizing from "./FontSizing";
import "../App.css";

import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "../App";
import { TranslateScript } from "./Translation";

// Function: Header
// Returns the header bar for the website, including links, accessibility, and a welcome message
const Header = () => {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const role = React.useContext(RoleContext);

    TranslateScript();

    return (
        <>
            <header className="header-items">
                <Navbar className="navbar">
                    <LinkContainer to="/">
                        <Navbar.Brand className="notranslate brand">
                            <div className="header-items">Mess Waffles</div>
                        </Navbar.Brand>
                    </LinkContainer>
                    <Nav>
                        <LinkContainer to="/">
                            <Nav.Link>
                                <div>Home</div>
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/menu">
                            <Nav.Link>
                                <div>Menu Board</div>
                            </Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/customer">
                            <Nav.Link>
                                <div>Customer</div>
                            </Nav.Link>
                        </LinkContainer>

                        {isAuthenticated &&
                            (role === "cashier" || role === "dev") && (
                                <>
                                    <LinkContainer to="/cashier">
                                        <Nav.Link>
                                            <div>Cashier</div>
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        {isAuthenticated &&
                            (role === "manager" || role === "dev") && (
                                <>
                                    <LinkContainer to="/manager">
                                        <Nav.Link>
                                            <div>Manager</div>
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        {isAuthenticated &&
                            (role === "admin" || role === "dev") && (
                                <>
                                    <LinkContainer to="/admin">
                                        <Nav.Link>
                                            <div>Admin</div>
                                        </Nav.Link>
                                    </LinkContainer>
                                </>
                            )}

                        {!isAuthenticated && (
                            <>
                                <Nav.Link onClick={() => loginWithRedirect()}>
                                    <div>Login</div>
                                </Nav.Link>
                            </>
                        )}

                        {isAuthenticated && (
                            <Nav.Link
                                onClick={() =>
                                    logout({
                                        logoutParams: {
                                            returnTo: window.location.origin,
                                        },
                                    })
                                }
                            >
                                <div>Logout</div>
                            </Nav.Link>
                        )}
                    </Nav>
                    <DarkMode />
                    <FontSizing />
                </Navbar>

                <p className="mt-4 ms-auto user-welcome">
                    Logged in as
                    {isAuthenticated ? (
                        <span className="notranslate">{" " + user.name}</span>
                    ) : (
                        " Guest"
                    )}
                </p>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
