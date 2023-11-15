import React from "react";
import "./Header.css";
import { Outlet, Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";
import { RoleContext } from "../App";

const Header = () => {
    const { isAuthenticated } = useAuth0();
    const role = React.useContext(RoleContext);
    return (
        <>
            <header>
                <h1>Mess Waffles</h1>
                <nav>
                    <h2>
                        <Link to="/">Home</Link>
                    </h2>
                    {isAuthenticated && role === "cashier" && (
                        <>
                            <h2>
                                <Link to="/cashier">Cashier</Link>
                            </h2>
                        </>
                    )}
                    {isAuthenticated && role === "manager" && (
                        <>
                            <h2>
                                <Link to="/manager">Manager</Link>
                            </h2>
                        </>
                    )}
                </nav>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
