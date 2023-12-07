// File: Cashier.js
// Cashier interface of the POS system

import React, { useEffect, useState } from "react";
import "./Cashier.css";
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
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const Cashier = () => {
    const [items, setItems] = useState([]);
    // Function: useEffect []
    // Gets the list of items from the database on page load
    //
    // Also gets list of pending orders on page load
    useEffect(() => {
        axios
            .get("https://messwafflespos.onrender.com/api/manager/items")
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
    var addons = [];

    const [Item_names, setItemNames] = useState([]);
    const [Prices, setPrices] = useState([]);

    const [price_tot, setTotal] = useState(0);

    // Function: updateItems
    // Updates the list of items in the order and the total price
    function updateItems(name, price) {
        setItemNames((olary) => [...olary, name]);
        setPrices((olary) => [...olary, price]);
        setTotal((oldPrice) => price_tot + parseFloat(price));
    }

    // Function: resetItems
    // Resets the list of items in the order and the total price
    function resetItems() {
        setItemNames((olary) => []);
        setPrices((olary) => []);
        setTotal((oldPrice) => 0.0);
    }
    const [pendingOrders, setOrders] = useState([]);
    useEffect(() => {
        axios
            .get("https://messwafflespos.onrender.com/api/cashier/order")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // Function: Items
    // Returns the list of items in the order and the total price
    function Items() {

        // Function: removeOrderItem
        // Removes an item from the order
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
                <div id="orderInfo">Total: ${price_tot.toFixed(2)}</div>
            </>
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
        };
        if (JSON.stringify(items.rows[i].category) == '"entree"') {
            entrees.push(menuItem);
        } else if (JSON.stringify(items.rows[i].category) == '"drinks"') {
            drinks.push(menuItem);
        } else if (JSON.stringify(items.rows[i].category) == '"seasonal"') {
            seasonal.push(menuItem);
        } else if (JSON.stringify(items.rows[i].category) == '"add-on"') {
            addons.push(menuItem);
        }
    }
    var entreesList = [];
    var drinksList = [];
    var seasonalList = [];
    var addonList = [];

    // Function: addOrder
    // Adds an item to the order
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
            <Button
                onClick={() => {
                    addOrder(item.item, item.price);
                }}
                key={index}
                variant="primary"
                size="lg"
                style={{ margin: 0.2 + "%" }}
            >
                {item.item}
            </Button>
        );
    });
    drinks.forEach((item, index) => {
        drinksList.push(
            <Button
                onClick={() => {
                    addOrder(item.item, item.price);
                }}
                key={index}
                variant="primary"
                size="lg"
                style={{ margin: 0.2 + "%" }}
            >
                {item.item}
            </Button>
        );
    });
    seasonal.forEach((item, index) => {
        seasonalList.push(
            <Button
                onClick={() => {
                    addOrder(item.item, item.price);
                }}
                key={index}
                variant="primary"
                size="lg"
                style={{ margin: 0.2 + "%" }}
            >
                {item.item}
            </Button>
        );
    });
    addons.forEach((item, index) => {
        addonList.push(
            <Button
                onClick={() => {
                    addOrder(item.item, item.price);
                }}
                key={index}
                variant="primary"
                size="lg"
                style={{ margin: 0.2 + "%" }}
            >
                {item.item}
            </Button>
        );
    });

    // Function: place_order
    // Places the order and sends it to the database
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
            //axios.post('http://localhost:5000/cashier/order', postdata)
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
        resetItems();
    }

    // Function: clear_orders
    // Clears the order
    function clear_orders() {
        resetItems();
    }

    // Function: UpdateOrder
    // Updates the status of an order
    function UpdateOrder(number, stat) {
        console.log("enterring updateorder");
        const postdata = {
            order_number: number,
            status: stat,
        };
        console.log("postdata is ", postdata);
        axios
            .post(
                "https://messwafflespos.onrender.com/api/cashier/updateOrder",
                postdata
            )
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    
    // Function: MyForm
    // Returns a form for entering an order number
    const MyForm = () => {
        const [formData, setFormData] = useState("");

        const handleInputChange = (event) => {
            setFormData(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            // You can perform actions with the formData here, like sending it to an API
            console.log("Form submitted with order number:", formData);
            // Reset formData state if needed
            UpdateOrder(formData, "complete");
        };

        return (
            <Form onSubmit={handleSubmit}>
                <InputGroup className="mb-3">
                    <Button
                        variant="outline-secondary"
                        type="submit"
                        id="button-addon1"
                    >
                        Finish Order
                    </Button>
                    <Form.Control
                        type="number"
                        placeholder="Enter order number"
                        aria-label="input order number"
                        aria-describedby="basic-addon1"
                        value={formData}
                        onChange={handleInputChange}
                    />
                </InputGroup>
            </Form>
        );
    };

    // Function: EditOrders
    // Update and return a list of orders
    function EditOrders() {
        const [Orders, setOrders] = useState([]);
        axios
            .get("https://messwafflespos.onrender.com/api/cashier/order")
            .then((response) => {
                setOrders(response.data);
            })
            .catch((err) => {
                console.log(err);
            });

        var IdList = [];
        var ItemsList = [];
        var PriceList = [];
        var _Orders = [];

        for (let i = 0; i < Orders.rowCount; i++) {
            PriceList.push(Orders.rows[i].total_price);
            IdList.push(Orders.rows[i].order_number);
            ItemsList.push(Orders.rows[i].item);
        }
        for (let i = 0; i < ItemsList.length; i++) {
            ItemsList[i] = ItemsList[i].toString();
        }

        for (let i = 0; i < PriceList.length; i++) {
            var order = [];
            order.push(IdList[i]);
            order.push(ItemsList[i]);
            order.push(PriceList[i]);

            _Orders.push(order);
        }

        return (
            <div
                style={{ overflowY: "auto" }}
                id="Orders"
                className="container"
            >
                <div className="row">
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Items</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: _Orders.length }).map(
                                (_, index) => (
                                    <tr key={index}>
                                        {
                                            <React.Fragment>
                                                <td>{_Orders[index][0]}</td>
                                                <td>{_Orders[index][1]}</td>
                                                <td>{_Orders[index][2]}</td>
                                            </React.Fragment>
                                        }
                                    </tr>
                                )
                            )}
                        </tbody>
                    </Table>
                </div>

                <div className="row">
                    <MyForm />
                </div>
            </div>
        );
    }

    return (
        //do not delete the cashier section id  from main
        <main id="cashierSection">
            {/* Cashier has two sections: A checkout section, and a Add items sections, roughly 4:6 or 3:7
            Checkout sections should take list of items in 'cart' and display with item name, quantity, and total price
            Add items section has two subsections: 'categories' and 'items'
            For now, we'll only implement main items */}
            {/* checkout */}

            <div className="col-4 border">
                <Items />

                <div id="OrderActions">
                    <Button
                        onClick={() => {
                            place_order();
                        }}
                        variant="primary"
                        size="lg"
                    >
                        Place Order
                    </Button>
                    <Button
                        onClick={() => {
                            clear_orders();
                        }}
                        variant="primary"
                        size="lg"
                    >
                        Cancel Order
                    </Button>
                </div>
            </div>

            <div className="col-8 border">
                <Tabs defaultActiveKey="entree">
                    <Tab eventKey="entree" title="Entrees">
                        {entreesList}
                    </Tab>
                    <Tab eventKey="drink" title="Drinks">
                        {drinksList}
                    </Tab>
                    <Tab eventKey="addons" title="Add-Ons">
                        {addonList}
                    </Tab>
                    <Tab eventKey="seasonal" title="Seasonal Items">
                        {seasonalList}
                    </Tab>
                    <Tab eventKey="orders" title="Orders">
                        <EditOrders />
                    </Tab>
                </Tabs>
            </div>
        </main>
    );
};

export default Cashier;
