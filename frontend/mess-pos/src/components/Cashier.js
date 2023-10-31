import React from 'react'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'

const Cashier = () => {
    function getItems() {

    }
    return (
        <main id='cashierSection'>        
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}
            <div>
                Checkout
            </div>
            {/* items */}
            <div>
                Items
                <Button variant="primary" size="lg">
          Large button
        </Button>{' '}
            </div>
        </main>
    )
}

export default Cashier;