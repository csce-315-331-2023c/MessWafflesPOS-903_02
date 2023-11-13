import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="cashier" element={<Cashier />} />
                    <Route path="manager" element={<Manager />}></Route>
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
            </BrowserRouter>
        </>
        // <>
        // <Header />
        // <Cashier />
        // <Footer />
        // </>
    );
};

export default App;
