import React from "react";
import {Route, Routes} from "react-router-dom";
import Header from "./components/Header"
import Footer from "./components/Footer"
import Cashier from "./components/Cashier"

const App = () => {
    return(
        <div>
            <Header />
            <Cashier />
        </div>
    );
}

export default App;