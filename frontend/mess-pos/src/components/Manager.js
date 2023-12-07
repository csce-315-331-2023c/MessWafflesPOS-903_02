import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form'
import React, {useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import "../App.css"
import Button from 'react-bootstrap/Button'

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
  // Trends
  const[loadingTrends, setLoadingTrends] = useState(true);
  const[trendsOrders, setTrendsOrders] = useState([]);
  // Orders from Date
  const[loadingOrders, setLoadingOrders] = useState(true);
  const[dateOrders, setDateOrders] = useState([]);
  
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
  // Trends
  const trendsMap = new Map();
  const trendsPairs = [];
  // Employees
  const [employeeData, setEmployeeData] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [triggerEmployeeData, setTriggerEmployeeData] = useState(false);
  // Date Orders
  const dateOrdersArr = [];

  // useEffect (on site render)
  useEffect(() => {
    axios.get('https://messwafflespos.onrender.com/api/manager/items')
      .then(res => {
        setItems(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    axios.get('https://messwafflespos.onrender.com/api/manager/inventory')
      .then(response => {
        setInventory(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    setTriggerEmployeeData(!triggerEmployeeData);
  },[]);

  useEffect(() => {
    axios
        .get("https://messwafflespos.onrender.com/api/auth/employees")
        .then((response) => {
            setEmployeeData(response.data);
            setLoadingEmployees(false);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [triggerEmployeeData]);

  // Form Submissions
  // Usage Report
  //Function: usageSubmit
  //Submits a request for a usage report given a form submission of two dates, renders the report
  const usageSubmit = (event) => {
    event.preventDefault(); // prevents default behavior of event submission
    setLoadingUsage(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    // get request orders between dates
    axios.get('https://messwafflespos.onrender.com/api/manager/orders', {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setUsageOrders(response.data);
      setLoadingUsage(false)
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Sales Report
  //Functions
  //Function: salesSubmit
  //Submits a request for a sales report given a form submission of two dates, renders the report
  const salesSubmit = (event) => {
    event.preventDefault();
    setLoadingOrdersSales(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    axios.get('https://messwafflespos.onrender.com/api/manager/orders', {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setSalesOrders(response.data);
      setLoadingOrdersSales(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Trends Report
  //Function: trendsSubmit
  //Submits a request for an ordering trends report given a form submission of two dates, renders the report
  const trendsSubmit = (event) => {
    event.preventDefault();
    setLoadingTrends(true);
    const eventDate1 = event.currentTarget[0].value; // dates
    const eventDate2 = event.currentTarget[1].value;
    axios.get('https://messwafflespos.onrender.com/api/manager/orders', {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setTrendsOrders(response.data);
      setLoadingTrends(false);
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
    const eventDate2 = new Date();
    axios.get('https://messwafflespos.onrender.com/api/manager/orders', {params: {date1: eventDate1, date2: eventDate2}})
    .then(response => {
      setExcessOrders(response.data);
      setLoadingExcess(false);
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Orders Submit
  const ordersSubmit = (event) => {
    event.preventDefault();
    setLoadingOrders(true);
    const eventDate = event.currentTarget[0].value;
    axios.get('https://messwafflespos.onrender.com/api/manager/dateOrders', {params: {date: eventDate}})
    .then(res => {
      setDateOrders(res.data);
      setLoadingOrders(false);
    })
    .catch(err => {
      console.log(err);
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
    // check for ingredients not used at all in orders
    for(let row of inventory.rows) {
      if(!excessMap.has(row.item)) {
        excessMap.set(row.item, 0);
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

  // Trends Report
  const processTrends = () => {
    // push pairs of items into a map, count occurances
    const pushToMap = (a, b) => {
      // idk why i had to stringify for this to work, but whatever
      if(trendsMap.has(JSON.stringify({item1: a, item2: b}))) {
        trendsMap.set(JSON.stringify({item1: a, item2: b}), trendsMap.get(JSON.stringify({item1: a, item2: b})) + 1)
      }
      else {
        trendsMap.set(JSON.stringify({item1: a, item2: b}), 1);
      }
    }
    // just do a double for loop and check each item
    for(let row of trendsOrders.rows) {
      for(let i = 0; i < row.item.length; i++) {
        for(let j = i; j < row.item.length; j++) {
          // It would be weird to say chicken says well with chicken, so check that items are not the same
          if(row.item[i] !== row.item[j]) {
            // have {a, b} and {b, a} process as {a, b}
            if(row.item[i] < row.item[j]) {
              pushToMap(row.item[i], row.item[j]);
            }
            else {
              pushToMap(row.item[j], row.item[i]);
            }
          }
        }
       } 
    }
    for(let [key, value] of trendsMap) {
      trendsPairs.push({items: JSON.parse(key), quantity: value});
    }
    trendsPairs.sort((a, b) => {
      if(a.quantity < b.quantity) {
        return 1;
      }
      else if(a.quantity > b.quantity) {
        return -1;
      }
      return 0;
    })
  }

  // DateOrders
  const processDateOrders = () => {
    console.log(dateOrders);
    for(let row of dateOrders.rows) {
      let orderStatus = row.status;
      if (orderStatus === null) {
        orderStatus = "completed";
      }
      let orderDate = new Date(row.order_date)
      dateOrdersArr.push({num: row.order_number, date: orderDate.toString(), price: row.total_price, items: row.item.toString(), status:orderStatus});
    }
    console.log(dateOrdersArr);
  }
  
  // Will Code
    function Inventory() {
    const [ings, setIngs] = useState([]);
    useEffect(() => {
        axios.get('https://messwafflespos.onrender.com/api/manager/inventory')
            .then(response => {
                setIngs(response.data);
            })
            .catch(err => {
                console.log(err);
            })
    },[]);
    var ingsList = [];
    var quantList = [];
    for(let i = 0; i < ings.rowCount;i++){
      ingsList.push(JSON.stringify(ings.rows[i].item).substring(1,JSON.stringify(ings.rows[i].item).length-1))
      quantList.push(ings.rows[i].quantity)
    }
    return (
        <>
        <div className= "checkout" >
            <div id = "itemCol" className="itemsCol">Item
                <ul style={{ display: 'block' }}>
                    {ingsList.map((item, index) => (
                    <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            
            <div id = "quantCol" className="itemsCol">Quantity
                <ul style={{display: 'block'}}>
                    {quantList.map((quantity, index) => (
                    <li key={index} >{quantity}</li>
                    ))}
                </ul>
            </div>
        </div>
    
        </>
    )
  }
  function updateInventory(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata)
    axios.post('https://messwafflespos.onrender.com/api/manager/inventory', postdata)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
  }
  function updateItems(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata)
    postdata.ingredients = "{" + postdata.ingredients + "}"
    axios.post('https://messwafflespos.onrender.com/api/manager/items', postdata)
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
  }
  function deleteIng(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata)
    axios.delete(`https://messwafflespos.onrender.com/api/manager/inventory/`,{
      data: postdata
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
  }
  function deleteItem(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata)
    axios.delete(`https://messwafflespos.onrender.com/api/manager/items/`,{
      data: postdata
    })
        .then(response => {
            console.log(response.data);
        })
        .catch(err => {
            console.log(err);
        });
  }
  function Items(){
    const [itemsMenu, setItemsMenu] = useState([]);
    useEffect(() => {
      axios.get('https://messwafflespos.onrender.com/api/manager/items')
          .then(response => {
              setItemsMenu(response.data);
          })
          .catch(err => {
              console.log(err);
          })
    },[]);
    var itemList = []
    var priceList = []
    var ingList = []
    var catList = []
    for(let i = 0; i < itemsMenu.rowCount;i++){
      itemList.push(JSON.stringify(itemsMenu.rows[i].item).substring(1,JSON.stringify(itemsMenu.rows[i].item).length-1))
      priceList.push(itemsMenu.rows[i].price)
      ingList.push(itemsMenu.rows[i].ingredients)
      catList.push(JSON.stringify(itemsMenu.rows[i].category).substring(1,JSON.stringify(itemsMenu.rows[i].category).length-1))
    }
    for(let i = 0; i < ingList.length;i++){
      ingList[i] = ingList[i].toString()
    }
    return (
      <>
      <div className= "checkout" >
          <div id = "itemCol" className="itemsCol">Item
              <ul style={{ display: 'block' }}>
                  {itemList.map((item, index) => (
                  <li key={index}>{item}</li>
                  ))}
              </ul>
          </div>
          
          <div id = "priceCol" className="itemsCol">Price
              <ul style={{display: 'block'}}>
                  {priceList.map((price, index) => (
                  <li key={index} >{price}</li>
                  ))}
              </ul>
          </div>
          <div id = "ingCol" className="itemsCol">Ingredients
              <ul style={{display: 'block'}}>
                  {ingList.map((ings, index) => (
                  <li key={index} >{ings}</li>
                  ))}
              </ul>
          </div>
          <div id = "catCol" className="itemsCol">Category
              <ul style={{display: 'block'}}>
                  {catList.map((cat, index) => (
                  <li key={index} >{cat}</li>
                  ))}
              </ul>
          </div>
      </div>
  
      </>
  )
  }
  function restockReport(e){
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata)
    var needsRestock = []
    const q = postdata.quantity
    axios.get('https://messwafflespos.onrender.com/api/manager/restockReport',{params:{quantity: q}})
        .then(response => {
            console.log(response.data)
            for(let i = 0; i < response.data.rowCount;i++){
              needsRestock.push(response.data.rows[i].item)
            }
            var restockList = needsRestock.toString()
            document.getElementById('restockReturn').innerHTML = restockList;
            console.log(restockList)
        })
        .catch(err => {
            console.log(err);
        });
        
  }

  // employee code
  function updateEmployee(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const postdata = Object.fromEntries(formData.entries());
    console.log(postdata);
    axios
        .post("https://messwafflespos.onrender.com/api/auth/employees", {
            id: postdata.ID,
            name: postdata.Name,
            email: postdata.Email,
            role: postdata.Role,
        })
        .then((response) => {
            console.log(response.data);
            setTriggerEmployeeData(!triggerEmployeeData);
        })
        .catch((err) => {
            console.log(err);
        });
  }
  function deleteEmployee(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const postdata = Object.fromEntries(formData.entries());
      console.log(postdata);
      axios
          .delete("https://messwafflespos.onrender.com/api/auth/employees", {
              data: { id: postdata.ID },
          })
          .then((response) => {
              console.log(response.data);
              setTriggerEmployeeData(!triggerEmployeeData);
          })
          .catch((err) => {
              console.log(err);
          });
  }

  function deleteOrder(e){
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const postdata = Object.fromEntries(formData.entries());
      console.log(postdata);
      axios
          .delete("https://messwafflespos.onrender.com/api/manager/order", {
              data: { order_number: postdata.order_number },
          })
          .then((response) => {
              console.log(response.data);
          })
          .catch((err) => {
              console.log(err);
          });
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

  if(!loadingTrends) {
    processTrends();
  }

  if(!loadingOrders) {
    processDateOrders();
  }

  return (
    <main>
    <Tabs defaultActiveKey="inventory">
      <Tab eventKey="inventory" title="Inventory">
        <div id = "invSection">
        <Inventory />
        <center><form onSubmit={updateInventory}>
          Update/Create item:
        <input name = "item" label = "item name" placeholder = "item name"/>
        <input name = "quantity" label = "quantity" placeholder = "quantity"/>
        <Button type="submit">Submit</Button>
        </form>
        <br></br>
        <form onSubmit={deleteIng}>
          Delete item:
          <input name = "item" label = "item name"  placeholder = "item name"/>
          <Button type="submit">Submit</Button>
        </form>
        </center>
        </div>
      </Tab>
      <Tab eventKey="menu" title="Menu">
        <Items />
        <center><form onSubmit={updateItems}>
          Update/Create item:
        <input name = "item" label = "item name" placeholder = "item name"/>
        <input name = "price" label = "price" placeholder = "price"/>
        <input name = "ingredients" label = "ingredients" placeholder = "ingredients"/>
        <input name = "category" label = "category" placeholder = "category"/>
        <input name = "picture" label = "picture" placeholder = "url for picture"/>
        <input name = "description" label = "description" placeholder = "item description"/>
        <Button type="submit">Submit</Button>
        </form>
        <br></br>
        <form onSubmit={deleteItem}>
          Delete item:
          <input name = "item" label = "item name" placeholder = "name"/>
          <Button type="submit">Submit</Button>
        </form>
        </center>
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
      <Tab eventKey = "restockReport" title = "Restock Report">
        <center>
          Enter a number to see all inventory items that need restock for that threshold:
          <form onSubmit={restockReport}>
            <input name = "quantity" label = "quantity" placeholder = "quantity threshold"/>
            <Button type="submit">Submit</Button>
          </form>
          <div id = "restockReturn"></div>
        </center>
      </Tab>
      <Tab eventKey="trends" title="Trends">
        {/* Ordering Trends (What sells together) */}
        <Form onSubmit={(trendsSubmit)}>
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
              <th>Item 1</th>
              <th>Item 2</th>
              <th>Times Sold Together</th>
            </tr>
          </thead>
          <tbody>
            {trendsPairs.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.items.item1}</td>
                  <td>{val.items.item2}</td>
                  <td>{val.quantity}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Tab>
      
      <Tab eventKey="employees" title="Employees">
          {loadingEmployees ? (
              <p>Loading Employees...</p>
          ) : (
              <>
                  <Table striped bordered hover>
                      <thead>
                          <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Role</th>
                              <th>Email</th>
                          </tr>
                      </thead>
                      <tbody>
                          {employeeData.rows.map((val, key) => {
                              return (
                                  <tr key={key}>
                                      <td>{val.id}</td>
                                      <td>{val.name}</td>
                                      <td>{val.role}</td>
                                      <td>{val.email}</td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </Table>
                  <center>
                      <form onSubmit={updateEmployee}>
                          Update/Create Employee:
                          <input
                              name="ID"
                              label="ID"
                              placeholder="ID"
                          />
                          <input
                              name="Name"
                              label="Name"
                              placeholder="Name"
                          />
                          <select
                              name="Role"
                              label="Role"
                              style={{
                                  width: "200px",
                                  height: "30px",
                              }}
                          >
                              <option value="Manager">Manager</option>
                              <option value="Cashier">Cashier</option>
                          </select>
                          <input
                              name="Email"
                              label="Email"
                              placeholder="Email"
                          />
                          <Button type="submit">Submit</Button>
                      </form>
                      <br></br>
                      <form onSubmit={deleteEmployee}>
                          Delete Employee:
                          <input
                              name="ID"
                              label="ID"
                              placeholder="ID"
                          />
                          <Button type="submit">Submit</Button>
                      </form>
                  </center>
              </>
          )}
      </Tab>

      <Tab eventKey="orders" title="Orders">
        <Form onSubmit={(ordersSubmit)}>
          <Form.Group controlId="date1">
            <Form.Label>Select Date</Form.Label>
            <Form.Control type="date" />
          </Form.Group>
          <Button type="submit">Get Orders</Button>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Items</th>
              <th>Total Price</th>
              <th>Order Status</th>
              <th>Order Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dateOrdersArr.map((val, key) => {
              return (
                <tr key={key}>
                  <td>{val.num}</td>
                  <td>{val.items}</td>
                  <td>{val.price}</td>
                  <td>{val.status}</td>
                  <td>{val.date}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
        <center>
        Delete Order:
          <form onSubmit={deleteOrder}>
              <input
                  name="order_number"
                  label="order_number"
                  placeholder="order number"
              />
              <Button type="submit">Submit</Button>
          </form>
        </center>
      </Tab>
    </Tabs>
    </main>
  )
}

export default Manager