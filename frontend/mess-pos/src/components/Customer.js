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

const Customer = () => {
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
    var cold  = [];
    var hot = [];
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

   

    function itemCard(item, price, index,description,picture) {
        return (
            <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={picture} />
            <Card.Body>
                <Card.Title>{item}</Card.Title>
                <Card.Text>
                {description}
                </Card.Text>
                <Button onClick={() => {addOrder(item, price);}} key={index} variant="primary">Add</Button>
            </Card.Body>
            </Card>
        );
    }

    
    const orders = new Map();


    for(let i = 0; i < items.rowCount; i++){
        const menuItem = {item: JSON.stringify(items.rows[i].item).substring(1,JSON.stringify(items.rows[i].item).length-1), price: JSON.stringify(items.rows[i].price).substring(1,JSON.stringify(items.rows[i].price).length-1),description: JSON.stringify(items.rows[i].description).substring(1,JSON.stringify(items.rows[i].description).length-1),picture: JSON.stringify(items.rows[i].picture).substring(1,JSON.stringify(items.rows[i].picture).length-1)};
        if(JSON.stringify(items.rows[i].category) == "\"entree\"") {
            entrees.push(menuItem);
        }
        else if(JSON.stringify(items.rows[i].category) == "\"drinks\"") {
            drinks.push(menuItem);
        }
        else if(JSON.stringify(items.rows[i].category) == "\"seasonal\"") {
            seasonal.push(menuItem);
        }
        if(JSON.stringify(items.rows[i].weather_type) == "\"cold\""){
            cold.push(menuItem);
        }
        if(JSON.stringify(items.rows[i].weather_type) == "\"hot\""){
            hot.push(menuItem);
        }
    }
    var entreesList = [];
    var drinksList = [];
    var seasonalList =[];
    var coldWeatherItems = [];
    var hotWeatherItems = [];

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
        entreesList.push( itemCard(item.item, item.price, index,item.description,item.picture))
    })
    drinks.forEach((item, index)=> {
        drinksList.push( itemCard(item.item, item.price, index,item.description,item.picture))
    })
    seasonal.forEach((item, index)=> {
        seasonalList.push( itemCard(item.item, item.price, index,item.description,item.picture))
    })
    cold.forEach((item, index)=> {
        coldWeatherItems.push( itemCard(item.item, item.price, index,item.description,0))
    })
    hot.forEach((item, index)=> {
        hotWeatherItems.push( itemCard(item.item, item.price, index,item.description,0))
    })
    
    const EntreePage = () => {
        
        return (
          <Row>
            {entreesList.map((item, index) => (
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

    const DrinksPage = () => {
        
        return (
          <Row>
            {drinksList.map((item, index) => (
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

    const SeasonalPage = () => {
        
        return (
          <Row>
            {seasonalList.map((item, index) => (
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

   const RecItems  = () =>{
    const [temp, setTemp] = useState([]);
    useEffect(() => {
        axios.get('http://api.weatherapi.com/v1/current.json?Key=f9d76b0584124e86bfa144719232711&q=77840')
            .then(response => {
                setTemp(response.data.current.temp_f);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    if(temp <= 60){
        return (
            <Row>
            {coldWeatherItems.map((item, index) => (
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
    else if (temp >= 70){
        return (
            <Row>
            {hotWeatherItems.map((item, index) => (
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
   }

    function Info() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
            <Button className='SeeOrder' variant="primary" size="lg" onClick={handleShow}>
                View Order
            </Button>

            <Offcanvas show={show} onHide={handleClose} backdrop = "static">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Current Order</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                        <p>Click an item to remove it</p> 
                        <Items />
                        <div id= 'orderactions'>
                            <Button onClick={() => {place_order();}} variant="primary" size="lg">Place Order</Button>
                            <Button  onClick={() => {resetItems();}}variant="primary" size="lg">Cancel Order</Button>
                        </div>
                </Offcanvas.Body>
            </Offcanvas>
            </>
        );
    }

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
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err);
            });
        resetItems();
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
            <Info/>
            <div id="menuSection" className="row-9 border">
                <Tabs defaultActiveKey="entree" fill >
                    <Tab eventKey="entree" title="Entrees">
                       <div>
                            <EntreePage/>
                       </div>
                
                    </Tab>
                    <Tab eventKey="drink" title="Drinks">
                        <div>
                            <DrinksPage/>
                       </div>
                    </Tab>
                    <Tab eventKey="seasonal" title="Seasonal Items">
                        <div>
                            <SeasonalPage/>
                       </div>
                    </Tab>
                    <Tab eventKey="rec" title="Recommended Items">
                        <div>
                            <RecItems/>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className='row-3 border'></div>
        </main>
    )
}

export default Customer;