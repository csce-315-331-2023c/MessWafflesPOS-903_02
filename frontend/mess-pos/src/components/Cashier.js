import React, {useEffect, useState} from 'react'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

const Cashier = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/manager/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    console.log(items);
    for(let i = 0; i < items.rowCount; i++){
        console.log(JSON.stringify(items.rows[i].item));
    }
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
                <Tabs defaultActiveKey="entree">
                    <Tab eventKey="entree" title="Entrees">
                        
                    </Tab>
                    <Tab eventKey="drink" title="Drinks">Tab Content for Dr</Tab>
                    <Tab eventKey="seasonal" title="Seasonal Items">Tab Content for SZN</Tab>
                </Tabs>
            </div>
        </main>
    )
}

export default Cashier;