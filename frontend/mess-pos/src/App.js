import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cashier from "./components/Cashier"
import Home from "./components/Home"
import Manager from "./components/Manager"
import Login from "./components/Login"
import Nav from 'react-bootstrap/Nav';
import DarkMode from "./components/DarkMode";

const App = () => {
    return(
        <>
        
        <BrowserRouter>
            <Header />
            <DarkMode/>
            <Routes>
                <Route index element={<Home />} />
                <Route path="cashier" element={<Cashier />}/>
                <Route path="manager" element={<Manager />}></Route>
                <Route path="login" element={<Login />}></Route>
            </Routes>
            <Footer />
        </BrowserRouter>
        </>
        // <>
        // <Header />
        // <Cashier />
        // <Footer />
        // </>
    );
}

export default App;