import React, {useEffect, useState} from 'react'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'
import axios from 'axios'

const Cashier = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/manager/items')
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    })

    return (
        <main id='cashierSection'>        
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}
            <div id= "itemsSection" className="col-4 border">
                Checkout
            </div>
            {/* items */}
            <div id="menuSection" className="col-8 border">
                Items
            </div>
        </main>
    )
}

export default Cashier;