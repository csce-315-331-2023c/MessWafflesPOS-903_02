import React, {useEffect, useState} from 'react'
import "./Customer.css"
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
import Card from 'react-bootstrap/Card';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Menu = () => {
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
    var menuItems = [];
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

   

    function itemCard(item, price, index,description,picture) {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }

    


    for(let i = 0; i < items.rowCount; i++){
        const menuItem = {item: JSON.stringify(items.rows[i].item).substring(1,JSON.stringify(items.rows[i].item).length-1), price: JSON.stringify(items.rows[i].price).substring(1,JSON.stringify(items.rows[i].price).length-1),description: JSON.stringify(items.rows[i].description).substring(1,JSON.stringify(items.rows[i].description).length-1),picture: JSON.stringify(items.rows[i].picture).substring(1,JSON.stringify(items.rows[i].picture).length-1)};
        menuItems.push(menuItem)
    }
    var menuList = []

    menuItems.forEach((item, index)=> {
        menuList.push( itemCard(item.item, item.price, index,item.description,item.picture))
    })
   
    
    const MenuPage = () => {
        
        return (
          <Row>
            {menuList.map((item, index) => (
              <Col key={index} sm={3}>
                {/* Adjust  based on how many items you want in a row */}
                <ListGroup>
                  <ListGroup.Item>{item}</ListGroup.Item>
                </ListGroup>
              </Col>
            ))}
          </Row>
        );
    }

    

   
   
    return (
        <main id='cashierSection'>        
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}
            

            {/* <div  className="col-4 border" >
                <Items />
                <div id= 'orderactions'>
                    <Button onClick={() => {place_order();}} variant="primary" size="lg">Place Order</Button>
                    <Button  variant="primary" size="lg">cancel Order</Button>
                </div>
                <div id="orderInfo"> 

                </div>
            </div> */}
            <div id="menuSection" className="row-9 border">
                <MenuPage/>
            </div>
            <div className='row-3 border'></div>
        </main>
    )
}

export default Menu;