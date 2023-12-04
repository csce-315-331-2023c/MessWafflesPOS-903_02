import React, {useEffect, useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const Manager = () => {
  // useState
  // Global useState vars (like ingredients list or inventory)
  const[items, setItems] = useState([]);
  const[inventory, setInventory] = useState([]);
  // Usage Report
  const[usageOrders, setUsageOrders] = useState([]);
  const[loadingUsage, setLoadingUsage] = useState(true);
  // Sales Report
  const[loadingOrdersSales, setLoadingOrdersSales] = useState(true);
  const[salesOrders, setSalesOrders] = useState([]);
  // Excess Report
  const[loadingExcess, setLoadingExcess] = useState(true);
  const[excessOrders, setExcessOrders] = useState([]);
  
  // Global Variables
  // Usage Report
  const usageMap = new Map();
  const ingredientsArr = [];
  const usageItems = [];
  const ingredientsQuant = []
  // Sales Report
  const salesMap = new Map();
  const salesItems = [];
  const itemsQuant = [];
  // Excess Report
  const excessMap = new Map();
  const excessIngredients = [];
  const excessItems = [];
  const excessQuant = [];

  // useEffect (on site render)
  useEffect(() => {
    axios.get("http://localhost:5000/manager/items")
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    axios.get('http://localhost:5000/manager/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  },[]);

  // Form Submissions
  // Usage Report
  const usageSubmit = (event) => {
    event.preventDefault(); // prevents default behavior of event submission
    setLoadingUsage(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    // get request orders between dates
    axios.get("http://localhost:5000/manager/orders", {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setUsageOrders(response.data);
      setLoadingUsage(false)
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Sales Report
  const salesSubmit = (event) => {
    event.preventDefault();
    setLoadingOrdersSales(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    axios.get("http://localhost:5000/manager/orders", {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setSalesOrders(response.data);
      setLoadingOrdersSales(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Excess Report
  const excessSubmit = (event) => {
    event.preventDefault();
    setLoadingExcess(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    axios.get("http://localhost:5000/manager/orders", {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setExcessOrders(response.data);
      setLoadingExcess(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Functions
  // Usage Report
  const processIngredients = () => {
    // push all the items purchased into an array
    for(let row of usageOrders.rows) {
      for(let item of row.item) {
        usageItems.push(item);
      }
    }
    // get ingredients for each item
    for(let item of usageItems) {
      // name difference between tables
      if(item === "reeses pb&j waffle sandwich") {
        item = "reeses pbj waffle sandwich";
      }
      // iterate through rows to find correct item
      for(let row of items.rows) {
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
  }

  // Sales Report
  const processOrders = () => {
    console.log("orders from dates: ", salesOrders);
    // push all the items purchased into an array
    for(let row of salesOrders.rows) {
      for(let item of row.item) {
        salesItems.push(item);
      }
    }
    // make a map to count quantity
    for(let item of salesItems) {
      if(salesMap.has(item)) {
        salesMap.set(item, salesMap.get(item) + 1);
      }
      else {
        salesMap.set(item, 1);
      }
    }
    // push {item: item, quantity: quantity} into array to be displayed by table
    for(let [key, value] of salesMap) {
      itemsQuant.push({ingredient: key, quantity: value});
    }
    console.log(itemsQuant);
  }

  // Excess Report
  const processExcess = () => {
    // copy paste code from usage report to get quantity of ingredients used
    // push all the items purchased into an array
    for(let row of excessOrders.rows) {
      for(let item of row.item) {
        excessItems.push(item);
      }
    }
    // get ingredients for each item
    for(let item of excessItems) {
      // name difference between tables
      if(item === "reeses pb&j waffle sandwich") {
        item = "reeses pbj waffle sandwich";
      }
      // iterate through rows to find correct item
      for(let row of items.rows) {
        // lower case comparison to avoid issues with different casing
        if(item.toLowerCase() === row.item.toLowerCase()) {
          // push all ingredients into an ingredient array
          for(let ingredient of row.ingredients) {
            excessIngredients.push(ingredient);
          }
        }
      }
    }
    // to get quantity, use a map
    for(let ingredient of excessIngredients) {
      // logic: if ingredient is in map, increment quantity by 1, else set quantity to 1.
      if(excessMap.has(ingredient)) {
        excessMap.set(ingredient, excessMap.get(ingredient) + 1);
      }
      else {
        excessMap.set(ingredient, 1); 
      }
    }
    for(let [key, value] of excessMap) {
      // i could probably just change the key value, but im going to avoid doing that cause it seems intuitively wrong
      let item = key;
      if(item === "reeses pb&j waffle sandwich") {
        item = "reeses pbj waffle sandwich";
      }
      // search inventory for ingredient === item === key
      for(let row of inventory.rows) {
        if(item.toLowerCase() === row.item.toLowerCase()) {
          // if the amount used is less than 10%, it is excess
          let excessPercent = value/(value + row.quantity);
          if (excessPercent < 0.10) {
            excessQuant.push({ingredient: key, used: value, current: row.quantity, percentage: excessPercent*100});
          }
        }
      }
    }
  }

  // Driver Code (basically, all this code is going to be used for is to check for loading)
  if(!loadingUsage) {
    processIngredients();
  }

  if(!loadingOrdersSales) {
    processOrders();
  }

  if(!loadingExcess) {
    processExcess();
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
        <Form onSubmit={(salesSubmit)}>
          <Form.Group controlId="date1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group controlId='date2'>
            <Form.Label>End Date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Button type="submit">Get Sales</Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity Purchased</th>
            </tr>
          </thead>
          <tbody>
            {itemsQuant.map((val, key) => {
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
      <Tab eventKey="excess" title="Excess">
        {/* Excess Report */}
        <Form onSubmit={(excessSubmit)}>
          <Form.Group controlId="date1">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Form.Group controlId='date2'>
            <Form.Label>End Date</Form.Label>
            <Form.Control type='date' />
          </Form.Group>
          <Button type="submit">Get Excess</Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity Used</th>
              <th>Quantity Remaining</th>
              <th>Percentage Used</th>
            </tr>
          </thead>
          <tbody>
            {excessQuant.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.ingredient}</td>
                  <td>{val.used}</td>
                  <td>{val.current}</td>
                  <td>{val.percentage}%</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
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