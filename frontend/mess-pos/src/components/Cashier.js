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
    var entrees = [];
    var drinks = [];
    var seasonal = [];
    const orders = new Map();
    for(let i = 0; i < items.rowCount; i++){
        if(JSON.stringify(items.rows[i].category) == "\"entree\"") {
            entrees.push({item: JSON.stringify(items.rows[i].item), price: JSON.stringify(items.rows[i].price)});
        }
        else if(JSON.stringify(items.rows[i].category) == "\"drinks\"") {
            drinks.push({item: JSON.stringify(items.rows[i].item), price: JSON.stringify(items.rows[i].price)});
        }
        else if(JSON.stringify(items.rows[i].category) == "\"seasonal\"") {
            seasonal.push({item: JSON.stringify(items.rows[i].item), price: JSON.stringify(items.rows[i].price)});
        }
    }
    var entreesList = [];
    var drinksList = [];
    var seasonalList =[];
    entrees.forEach((item, index)=> {
        entreesList.push( <Button key={index} variant="primary" size="lg">{item.item}</Button>)
    })
    drinks.forEach((item, index)=> {
        drinksList.push( <Button key={index} variant="primary" size="lg">{item.item}</Button>)
    })
    seasonal.forEach((item, index)=> {
        seasonalList.push( <Button key={index} variant="primary" size="lg">{item.item}</Button>)
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
                <Tabs defaultActiveKey="entree">
                    <Tab eventKey="entree" title="Entrees">
                        {entreesList}
                    </Tab>
                    <Tab eventKey="drink" title="Drinks">{drinksList}</Tab>
                    <Tab eventKey="seasonal" title="Seasonal Items">{seasonalList}</Tab>
                </Tabs>
            </div>
        </main>
    )
}

export default Cashier;