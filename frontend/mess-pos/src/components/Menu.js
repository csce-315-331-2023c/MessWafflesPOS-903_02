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
import "../App.css";

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
   
    function itemCard(item, price, index,description,picture) {
        return (
            <Card style={{ width: '25 rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{item + ' $' + price}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }

    for(let i = 0; i < items.rowCount; i++){
        const menuItem = {item: JSON.stringify(items.rows[i].item).substring(1,JSON.stringify(items.rows[i].item).length-1), price: JSON.stringify(items.rows[i].price).substring(1,JSON.stringify(items.rows[i].price).length-1),description: JSON.stringify(items.rows[i].description).substring(1,JSON.stringify(items.rows[i].description).length-1),picture: JSON.stringify(items.rows[i].picture).substring(1,JSON.stringify(items.rows[i].picture).length-1)};
        if(items.rows[i].category !== 'add-on')
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
                  <ListGroup.Item className='header-items'>{item}</ListGroup.Item>
                </ListGroup>
              </Col>
            ))}
          </Row>
        );
    }

    

   
   
    return (
        <div className='card-body'>
            <main id='cashierSection'>
                <div id="menuSection" className="row-9 border">
                    <MenuPage/>
                </div>
            </main>
        </div>
    )
}

export default Menu;