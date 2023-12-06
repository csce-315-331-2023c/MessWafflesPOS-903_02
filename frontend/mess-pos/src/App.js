// File: App.js
// Renders all components and routes

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cashier from "./components/Cashier";
import Customer from "./components/Customer";
import Home from "./components/Home";
import Manager from "./components/Manager";
import Menu from "./components/Menu";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useState, useEffect } from "react";

export const RoleContext = React.createContext();
// Function: App
// Returns the main app component
const App = () => {
    const { user, isAuthenticated } = useAuth0();
    const [role, setRole] = useState(null);

    // Function: useEffect [isAuthenticated]
    // Queries backend and updates role variable when isAuthenticated changes
    useEffect(() => {
        if (isAuthenticated) {
            console.log("logged in");
            const emaildata = {
                email: user.email,
            };
            axios
                .get("https://messwafflespos.onrender.com/api/auth/role", {
                    params: emaildata,
                })
                .then((res) => {
                    console.log(res.data.rows[0].role.toLowerCase());
                    setRole(res.data.rows[0].role.toLowerCase());
                })
                .catch((err) => {
                    console.log(err);
                    setRole("");
                });
        } else {
            console.log("not logged in");
            setRole("");
        }
    }, [isAuthenticated]);

    return (
        <>
            <RoleContext.Provider value={role}>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="cashier" element={<Cashier />} />
                    <Route path="manager" element={<Manager />} />
                    <Route path="customer" element={<Customer />} />
                    <Route path="menu" element={<Menu />} />
                </Routes>

                <Footer />
            </RoleContext.Provider>
        </>
    );
};

export default App;
