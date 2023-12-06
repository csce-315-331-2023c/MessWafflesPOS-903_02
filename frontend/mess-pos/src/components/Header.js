import React, { useEffect } from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import { LinkContainer } from "react-router-bootstrap";
import DarkMode from './DarkMode';
import FontSizing from './FontSizing';

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
                            <Nav.Link><div>Home</div></Nav.Link>
                        </LinkContainer>

                        {/* {isAuthenticated && role === "cashier" && (
                            <>
                                <LinkContainer to="/cashier">
                                    <Nav.Link><div>Cashier</div></Nav.Link>
                                </LinkContainer>
                            </>
                        )} */}

                        {/* {isAuthenticated && role === "manager" && (
                            <>
                                <LinkContainer to="/manager">
                                    <Nav.Link><div>Manager</div></Nav.Link>
                                </LinkContainer>
                            </>
                        )} */}

                        <LinkContainer to="/cashier">
                            <Nav.Link><div>Cashier</div></Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/manager">
                            <Nav.Link><div>Manager</div></Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/customer">
                            <Nav.Link><div>Customer</div></Nav.Link>
                        </LinkContainer>

                        <Nav.Link onClick={() => loginWithRedirect()}>
                            <div>Login</div>
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
                            <div>Logout</div>
                        </Nav.Link>
                    </Nav>
                    <DarkMode />
                    <FontSizing />
                </Navbar>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
