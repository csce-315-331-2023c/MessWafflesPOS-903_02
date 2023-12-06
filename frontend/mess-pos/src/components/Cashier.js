import React, {useEffect, useState} from 'react'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import ListGroupItem from 'react-bootstrap/esm/ListGroupItem'

const Cashier = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get('https://messwafflespos.onrender.com/api/manager/items')
            .then(response => {
                setItems(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    var entrees = [];
    var drinks = [];
    var seasonal = [];

    const [Item_names, setItemNames] = useState([]);
    const [Prices, setPrices] = useState([]);

    const [price_tot, setTotal] = useState(0);

    function updateItems(name, price) {

        setItemNames(olary => [...olary, name]);
        setPrices(olary => [...olary, price]);
        setTotal(oldPrice => price_tot+ parseFloat(price));
    }

    function resetItems(){
        setItemNames(olary => []);
        setPrices(olary => []);
        setTotal(oldPrice => 0.00);
    }

    function Items() {



        
        function removeOrderItem(i) {
            if (window.confirm('delete ' + i + ' from the order?')){
                var array_i = [...Item_names]; 
                var array_p = [...Prices]; 
                var index = array_i.indexOf(i);
                var price = array_p[index];
                
                if (index !== -1) {
                    array_i.splice(index, 1);
                    setItemNames(olary => [...array_i]);
                    array_p.splice(index, 1);
                    setPrices(olary => [...array_p]);
                    setTotal(oldPrice => price_tot- parseFloat(price));
                }
            }
            

        };
        
        return (
            <>
            <div style={{overflowY: "auto"}} className= "checkout" >
                <div id = "priceCol" className="itemsCol">Item
                    <ListGroup  style={{ display: 'block' }}>
                        {Item_names.map((item, index) => (
                        <ListGroupItem  action onClick= { () => {removeOrderItem(item);}} key={index}>{item}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
                
                <div id = "priceCol" className="itemsCol">Price
                    <ListGroup style={{display: 'block'}}>
                        {Prices.map((item, index) => (
                        <ListGroupItem key={index} >{item}</ListGroupItem>
                        ))}
                    </ListGroup>
                </div>
            </div>
            <div id="orderInfo"> 
                Total: ${price_tot.toFixed(2)}
            </div>
                
            </>
        )
    }

    

    const orders = new Map();

    
    for(let i = 0; i < items.rowCount; i++){
        const menuItem = {item: JSON.stringify(items.rows[i].item).substring(1,JSON.stringify(items.rows[i].item).length-1), price: JSON.stringify(items.rows[i].price).substring(1,JSON.stringify(items.rows[i].price).length-1)};
        if(JSON.stringify(items.rows[i].category) == "\"entree\"") {
            entrees.push(menuItem);
        }
        else if(JSON.stringify(items.rows[i].category) == "\"drinks\"") {
            drinks.push(menuItem);
        }
        else if(JSON.stringify(items.rows[i].category) == "\"seasonal\"") {
            seasonal.push(menuItem);
        }
    }
    var entreesList = [];
    var drinksList = [];
    var seasonalList =[];

    

    function addOrder(name, price) {
        if (orders.has(name)) {
            orders.set(name, {price: price, quantity: orders.get(name).quantity + 1})
        }
        else {
            orders.set(name, {price: price, quantity: 1});
        }
        updateItems(name,price);
        console.log(name, orders.get(name).quantity, orders.get(name).price);
    }
    entrees.forEach((item, index)=> {
        entreesList.push( <Button onClick={() => {addOrder(item.item, item.price);}} key={index} variant="primary" size="lg" style = {{margin: .2 + '%'}}>{item.item}</Button>)
    })
    drinks.forEach((item, index)=> {
        drinksList.push( <Button onClick={() => {addOrder(item.item, item.price);}} key={index} variant="primary" size="lg" style = {{margin: .2 + '%'}}>{item.item}</Button>)
    })
    seasonal.forEach((item, index)=> {
        seasonalList.push( <Button onClick={() => {addOrder(item.item, item.price);}} key={index} variant="primary" size="lg" style = {{margin: .2 + '%'}}>{item.item}</Button>)
    })

    function place_order(){
        const date = new Date();
        var n = 0;
        for( let i = 0; i < Prices.length; i++){
            console.log(Prices[i].replace("\"", ""));

            n += parseFloat(Prices[i].replace("\"", ""));
        }
        

        console.log(n);
        console.log(Item_names);
        console.log();

        const postdata = {
            item: Item_names,
            order_date: date,
            total_price: n
        }
        
        axios.post('https://messwafflespos.onrender.com/api/cashier/order', postdata)
        //axios.post('http://localhost:5000/cashier/order', postdata)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        resetItems();
    }   
    function updateOrder(){
        const postdata = {
            order_number: 34534534534534,
            status:'Completed'
        }
        axios.post('http://localhost:5000/cashier/updateOrder', postdata)
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    function clear_orders(){
        resetItems();
    }

    return (//do not delete the cashier section id  from main
        <main id='cashierSection'>      
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}
            

            <div  className="col-4 border" >
                <Items />

                <div id= 'OrderActions'>
                    <Button onClick={() => {place_order();}} variant="primary" size="lg">Place Order</Button>
                    <Button onClick={() => {clear_orders();}} variant="primary" size="lg">Cancel Order</Button>
                </div>

            </div>

            <div  className="col-8 border">
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