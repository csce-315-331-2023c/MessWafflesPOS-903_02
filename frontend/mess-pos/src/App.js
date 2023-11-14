import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cashier from "./components/Cashier";
import Home from "./components/Home";
import Manager from "./components/Manager";

import {
    LoginButton,
    LogoutButton,
    OAuthText,
    APIRoutes,
} from "./components/OAuth";

import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const App = () => {
    // get user email
    const { user, isAuthenticated } = useAuth0();
    const [role, setRole] = useState(null);

    // send request to backend to determine role
    useEffect(() => {
        if (isAuthenticated) {
            console.log("logged in");
            axios
                .get("http://localhost:5000/role", {
                    params: {
                        email: user.email,
                    },
                })
                .then((res) => {
                    console.log(res);
                    setRole(res.data);
                })
                .catch((err) => {
                    console.log(err);
                    setRole("manager");
                });
        } else {
            console.log("not logged in");
            setRole("cashier");
        }
    }, [isAuthenticated]);

    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
                {role == "cashier" && (
                    <Route path="cashier" element={<Cashier />} />
                )}
                {role == "manager" && (
                    <Route path="manager" element={<Manager />} />
                )}

                {/* <Route path="cashier" element={<Cashier />} />
                <Route path="manager" element={<Manager />} /> */}
            </Routes>
            <h1>OAuth stuff</h1>
            <ul>
                <li>
                    <LoginButton />
                </li>
                <li>
                    <LogoutButton />
                </li>
            </ul>
            <OAuthText />
            <APIRoutes />
            <Footer />
        </>
    );
};

export default App;
