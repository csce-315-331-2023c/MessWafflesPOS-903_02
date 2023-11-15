import React, {useState} from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form'

const Manager = () => {
  // useState
  const[usage, setUsage] = useState(new Map());

  // Functions
  function getUsage(){
    console.log("getting Usage");
  }
  
  const usageMap = new Map();

  const usageSubmit = (event) => {
    event.preventDefault(); // prevents default behavior of event submission
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    console.log(eventDate1, eventDate2);
    // get request orders between dates
    axios.get(`http://localhost:5000/manager/orders`, {params: {date1: eventDate1, date2: eventDate2}})
     .then(response => {
        // for every row in the response data (for every order)
        for(let i = 0; i < response.data.rowCount; i++) {
          // for every item of order
          for(let item of response.data.rows[i].item) {
            // get ingredients for every item
            axios.get('http://localhost:5000/manager/ingredients', {params: {item: item}})
              .then(res => {
                console.log(res.data);
              })
              .catch(error => {
                console.log(error);
              })
          }
        }
    })
      .catch(err => {
        console.log(err);
    })
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