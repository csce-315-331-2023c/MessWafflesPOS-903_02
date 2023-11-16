import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const Manager = () => {
  // useState
  const[orders, setOrders] = useState([]);
  const[ingredients, setIngredients] = useState([]);
  const[loadingAPI, setLoadingAPI] = useState(true);
  
  // Global Variables 
  const usageMap = new Map();
  const ingredientsArr = [];
  const items = [];
  const ingredientsQuant = []

  // Functions
  const usageSubmit = (event) => {
    event.preventDefault(); // prevents default behavior of event submission
    setLoadingAPI(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    // get request orders between dates
    axios.get("http://localhost:5000/manager/orders", {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setOrders(response.data);
      // get request items table, which contains items with associated ingredients
      axios.get("http://localhost:5000/manager/items")
        .then(res => {
          setIngredients(res.data)
          setLoadingAPI(false);
        })
        .catch(err => {
          console.log(err);
        })
    })
    .catch(error => {
      console.log(error);
    })
  }

  const processIngredients = () => {
    console.log("items table: ", ingredients,"orders from dates: ", orders);
    // push all the items purchased into an array
    for(let row of orders.rows) {
      for(let item of row.item) {
        items.push(item);
      }
    }
    // get ingredients for each item
    for(let item of items) {
      // name difference between tables
      if(item === "reeses pb&j waffle sandwich") {
        item = "reeses pbj waffle sandwich";
      }
      // iterate through rows to find correct item
      for(let row of ingredients.rows) {
        // lower case comparison to avoid issues with different casing
        if(item.toLowerCase() === row.item.toLowerCase()) {
          // push all ingredients into an ingredient array
          for(let ingredient of row.ingredients) {
            ingredientsArr.push(ingredient);
          }
        }
      }
    }
    // to get quantity, use a map
    for(let ingredient of ingredientsArr) {
      // logic: if ingredient is in map, increment quantity by 1, else set quantity to 1.
      if(usageMap.has(ingredient)) {
        usageMap.set(ingredient, usageMap.get(ingredient) + 1);
      }
      else {
        usageMap.set(ingredient, 1); 
      }
    }
    // push {ingredient: ingredient, quantity: quantity} into array to be displayed by table
    for(let [key, value] of usageMap) {
      ingredientsQuant.push({ingredient: key, quantity: value});
    }
    console.log(ingredientsQuant);
  }

  // should wait for all data to be gathered
  if(!loadingAPI) {
    processIngredients();
  }

  return (
    <main>
    <Tabs defaultActiveKey="inventory">
      <Tab eventKey="inventory" title="Inventory">
        {/* Content for inventory tab */}
        Inventory
      </Tab>
      <Tab eventKey="menu" title="Menu">
        {/* Content for Menu tab */}
        Menu
      </Tab>
      <Tab eventKey="usage" title="Usage">
        {/* Product Usage */}
        <Form onSubmit={(usageSubmit)}>
          <Form.Group controlId="date1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group controlId='date2'>
            <Form.Label>End Date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Button type="submit">Get Usage</Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Quantity Used</th>
            </tr>
          </thead>
          <tbody>
            {ingredientsQuant.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.ingredient}</td>
                  <td>{val.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Tab>
      <Tab eventKey="sales" title="Sales">
        {/* Sales Report */}
        Sales Report
      </Tab>
      <Tab eventKey="excess" title="Excess">
        {/* Excess Report */}
        Excess Report
      </Tab>
      <Tab eventKey="restock" title="Restock">
        {/* Restock Report*/}
        Restock Report
      </Tab>
      <Tab eventKey="trends" title="Trends">
        {/* Ordering Trends (What sells together) */}
        Ordering Trends
      </Tab>
    </Tabs>
    </main>
  )
}

export default Manager