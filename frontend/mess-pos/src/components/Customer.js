// File: Customer.js
// Customer interface of the POS system

import React, { useEffect, useState } from "react";
import "./Customer.css";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Stack from "react-bootstrap/Stack";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";

const Customer = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios
            .get("https://project-3-903-02.onrender.com/manager/items")
            .then((response) => {
                setItems(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    var entrees = [];
    var drinks = [];
    var seasonal = [];
    var cold = [];
    var hot = [];
    var addons = [];
    const [Item_names, setItemNames] = useState([]);
    const [Prices, setPrices] = useState([]);

    const [price_tot, setTotal] = useState(0);

    const [temperature, setTemperature] = useState(100);

    // Function: updateItems
    // Updates the list of items in the order given the name and price of the item
    function updateItems(name, price) {
        setItemNames((olary) => [...olary, name]);
        setPrices((olary) => [...olary, price]);
        setTotal((oldPrice) => price_tot + parseFloat(price));
    }

    // Function: resetItems
    // Resets the list of items in the order
    function resetItems() {
        setItemNames((olary) => []);
        setPrices((olary) => []);
        setTotal((oldPrice) => 0.0);
    }

    // Function: Items
    // Returns the list of items in the order
    function Items() {
        // Function: removeOrderItem
        // Removes an item from the order given its name
        function removeOrderItem(i) {
            if (window.confirm("delete " + i + " from the order?")) {
                var array_i = [...Item_names];
                var array_p = [...Prices];
                var index = array_i.indexOf(i);
                var price = array_p[index];

                if (index !== -1) {
                    array_i.splice(index, 1);
                    setItemNames((olary) => [...array_i]);
                    array_p.splice(index, 1);
                    setPrices((olary) => [...array_p]);
                    setTotal((oldPrice) => price_tot - parseFloat(price));
                }
            }
        }

        return (
            <>
                <div style={{ overflowY: "auto" }} className="checkout">
                    <div id="priceCol" className="itemsCol">
                        Item
                        <ListGroup style={{ display: "block" }}>
                            {Item_names.map((item, index) => (
                                <ListGroupItem
                                    action
                                    onClick={() => {
                                        removeOrderItem(item);
                                    }}
                                    key={index}
                                >
                                    {item}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>

                    <div id="priceCol" className="itemsCol">
                        Price
                        <ListGroup style={{ display: "block" }}>
                            {Prices.map((item, index) => (
                                <ListGroupItem key={index}>
                                    {item}
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </div>
                </div>
                <div id="orderInfo" className="card-text">
                    Total: ${price_tot.toFixed(2)}
                </div>
            </>
        );
    }

    // Function: MenuButton
    // Returns a button that adds an item to the order
    function MenuButton({ item, price }) {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            function simulateNetworkRequest() {
                return new Promise((resolve) => setTimeout(resolve, 700));
            }

            if (isLoading) {
                simulateNetworkRequest().then(() => {
                    addOrder(item, price);
                    setLoading(false);
                });
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
            <Button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? "Added to order" : "Add"}
            </Button>
        );
    }

    // Function: PlaceButton
    // Returns a button that places the order
    function PlaceButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            function simulateNetworkRequest() {
                return new Promise((resolve) => setTimeout(resolve, 800));
            }

            if (isLoading) {
                simulateNetworkRequest().then(() => {
                    place_order();
                    setLoading(false);
                });
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
            <Button
                variant="primary"
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? "Order Submitted" : "Place Order"}
            </Button>
        );
    }

    // Function: CancelButton
    // Returns a button that cancels the order
    function CancelButton() {
        const [isLoading, setLoading] = useState(false);

        useEffect(() => {
            function simulateNetworkRequest() {
                return new Promise((resolve) => setTimeout(resolve, 700));
            }

            if (isLoading) {
                simulateNetworkRequest().then(() => {
                    resetItems();
                    setLoading(false);
                });
            }
        }, [isLoading]);

        const handleClick = () => setLoading(true);

        return (
            <Button
                variant="primary"
                size="lg"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >
                {isLoading ? "Cancelling" : "Cancel Order"}
            </Button>
        );
    }

    // Function: itemCard
    // Returns a card for an item given its name, price, description, and picture
    function itemCard(item, price, index, description, picture) {
        return (
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={picture} />
                <Card.Body className="card-body">
                    <Card.Title>
                        {item}
                        {" $" + price}
                    </Card.Title>
                    <Card.Text className="card-text">{description}</Card.Text>
                    <MenuButton key={index} item={item} price={price} />
                </Card.Body>
            </Card>
        );
    }

    const orders = new Map();

    for (let i = 0; i < items.rowCount; i++) {
        const menuItem = {
            item: JSON.stringify(items.rows[i].item).substring(
                1,
                JSON.stringify(items.rows[i].item).length - 1
            ),
            price: JSON.stringify(items.rows[i].price).substring(
                1,
                JSON.stringify(items.rows[i].price).length - 1
            ),
            description: JSON.stringify(items.rows[i].description).substring(
                1,
                JSON.stringify(items.rows[i].description).length - 1
            ),
            picture: JSON.stringify(items.rows[i].picture).substring(
                1,
                JSON.stringify(items.rows[i].picture).length - 1
            ),
        };
        if (JSON.stringify(items.rows[i].category) == '"entree"') {
            entrees.push(menuItem);
        } else if (JSON.stringify(items.rows[i].category) == '"drinks"') {
            drinks.push(menuItem);
        } else if (JSON.stringify(items.rows[i].category) == '"seasonal"') {
            seasonal.push(menuItem);
        }
        if (JSON.stringify(items.rows[i].weather_type) == '"cold"') {
            cold.push(menuItem);
        }
        if (JSON.stringify(items.rows[i].weather_type) == '"hot"') {
            hot.push(menuItem);
        }
        if (JSON.stringify(items.rows[i].category) == '"add-on"') {
            addons.push(menuItem);
        }
    }
    var entreesList = [];
    var drinksList = [];
    var seasonalList = [];
    var coldWeatherItems = [];
    var hotWeatherItems = [];
    var addonList = [];

    // Function: addOrder
    // Adds an item to the order given its name and price
    function addOrder(name, price) {
        if (orders.has(name)) {
            orders.set(name, {
                price: price,
                quantity: orders.get(name).quantity + 1,
            });
        } else {
            orders.set(name, { price: price, quantity: 1 });
        }
        updateItems(name, price);
        console.log(name, orders.get(name).quantity, orders.get(name).price);
    }

    entrees.forEach((item, index) => {
        entreesList.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });
    drinks.forEach((item, index) => {
        drinksList.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });
    seasonal.forEach((item, index) => {
        seasonalList.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });
    cold.forEach((item, index) => {
        coldWeatherItems.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });
    hot.forEach((item, index) => {
        hotWeatherItems.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });
    addons.forEach((item, index) => {
        addonList.push(
            itemCard(
                item.item,
                item.price,
                index,
                item.description,
                item.picture
            )
        );
    });

    // Function: EntreePage
    // Returns a render of all Entrees
    const EntreePage = () => {
        return (
            <Row className="card-body">
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
    };

    // Function: DrinksPage
    // Returns a render of all Drinks
    const DrinksPage = () => {
        return (
            <Row className="card-body">
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
    };

    // Function: SeasonalPage
    // Returns a render of all Seasonal Items
    const SeasonalPage = () => {
        return (
            <Row className="card-body">
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
    };

    // Function: AddonPage
    // Returns a render of all Add-Ons
    const AddonPage = () => {
        return (
            <Row className="card-body">
                {addonList.map((item, index) => (
                    <Col key={index} sm={3}>
                        {/* Adjust  based on how many items you want in a row */}
                        <ListGroup>
                            <ListGroup.Item>{item}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                ))}
            </Row>
        );
    };

    // Function: RecItems
    // Returns a render of all Recommended Items based on weather
    const RecItems = () => {
        useEffect(() => {
            axios
                .get(
                    "https://api.weatherapi.com/v1/current.json?Key=f9d76b0584124e86bfa144719232711&q=77840"
                )
                .then((response) => {
                    setTemperature(response.data.current.temp_f);
                    console.log(temperature);
                })
                .catch((err) => {
                    console.log(err);
                });
        }, []);

        return (
            <Row className="card-body">
                {temperature <= 60 ? (
                    coldWeatherItems.map((item, index) => (
                        <Col key={index} sm={3}>
                            {/* Adjust  based on how many items you want in a row */}
                            <ListGroup>
                                <ListGroup.Item>{item}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    ))
                ) : (temperature >= 70 ? (
                    hotWeatherItems.map((item, index) => (
                        <Col key={index} sm={3}>
                            {/* Adjust  based on how many items you want in a row */}
                            <ListGroup>
                                <ListGroup.Item>{item}</ListGroup.Item>
                            </ListGroup>
                        </Col>
                    ))
                ) : () => { return <div></div> })
                }
            </Row>
        )
    };

    // Function: Info
    // Returns an offcanvas that displays the current order
    function Info() {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>
                <Button
                    className="SeeOrder"
                    variant="primary"
                    size="lg"
                    onClick={handleShow}
                >
                    View Order
                </Button>

                <Offcanvas show={show} onHide={handleClose} backdrop="static">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Current Order</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="card-body">
                        <p>Click an item to remove it</p>
                        <Items />
                        <div id="orderactions">
                            <PlaceButton />
                            <CancelButton />
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        );
    }

    // Function: place_order
    // Places the order using axios
    function place_order() {
        const date = new Date();
        var n = 0;
        for (let i = 0; i < Prices.length; i++) {
            console.log(Prices[i].replace('"', ""));

            n += parseFloat(Prices[i].replace('"', ""));
        }

        console.log(n);
        console.log(Item_names);
        console.log();

        const postdata = {
            item: Item_names,
            order_date: date,
            total_price: n,
        };

        axios
            .post(
                "https://messwafflespos.onrender.com/api/cashier/order",
                postdata
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        resetItems();
    }

    return (
        <main id="cashierSection" className="card-body">
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
            <Info />
            <div id="menuSection" className="card-body">
                <Tabs defaultActiveKey="entree" fill>
                    <Tab eventKey="entree" title="Entrees">
                        <div className="card-body">
                            <EntreePage />
                        </div>
                    </Tab>
                    <Tab eventKey="drink" title="Drinks">
                        <div>
                            <DrinksPage />
                        </div>
                    </Tab>
                    <Tab eventKey="seasonal" title="Seasonal Items">
                        <div>
                            <SeasonalPage />
                        </div>
                    </Tab>
                    <Tab eventKey="addons" title="Add-Ons">
                        <div>
                            <AddonPage />
                        </div>
                    </Tab>
                    <Tab
                        eventKey="rec"
                        title="Recommended Items (based on weather)"
                    >
                        <div>
                            <RecItems />
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="row-3 border"></div>
        </main>
    );
};

export default Customer;
