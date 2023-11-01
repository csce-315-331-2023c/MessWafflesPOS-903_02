import React, {useEffect, useState} from 'react'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'

const Cashier = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            const response = await fetch(`http://localhost:5000/cashier`);
            if(!response.ok){
                const message = `An error has occured: ${response.statusText}`;
                window.alert(message);
            return;
            }
        const items = await response.json();
        setItems(items);
        }

        getItems();

        return;
    }, [items.length]);
    return (
        <main id='cashierSection'>        
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}
            <div id= "itemsSection" class="col-4 border">
                Checkout
            </div>
            {/* items */}
            <div id="menuSection" class = "col-8 border">
                Items
            </div>
        </main>
    )
}

export default Cashier;