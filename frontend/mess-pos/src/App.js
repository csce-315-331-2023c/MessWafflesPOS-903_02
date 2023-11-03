import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cashier from "./components/Cashier"
import Layout from "./components/Layout"
import Home from "./components/Home"

const App = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />} />
                    <Route index element={<Home />} />
                    <Route path="cashier" element={<Cashier />} />
            </Routes>
        </BrowserRouter>
        // <>
        // <Header />
        // <Cashier />
        // <Footer />
        // </>
    );
}

export default App;