import React, {useEffect, useState} from 'react'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import axios from 'axios'
import "./Cashier.css"
import Button from 'react-bootstrap/Button'

const Manager = () => {
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
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/manager/items')
        .then(response => {
            setItems(response.data);
        })
        .catch(err => {
            console.log(err);
        })
  },[]);
  var itemList = []
  var priceList = []
  var ingList = []
  var catList = []
  for(let i = 0; i < items.rowCount;i++){
    itemList.push(JSON.stringify(items.rows[i].item).substring(1,JSON.stringify(items.rows[i].item).length-1))
    priceList.push(items.rows[i].price)
    ingList.push(items.rows[i].ingredients)
    catList.push(JSON.stringify(items.rows[i].category).substring(1,JSON.stringify(items.rows[i].category).length-1))
  }
  function Inventory() {
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
    axios.post('http://localhost:5000/manager/inventory', postdata)
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
    axios.post('http://localhost:5000/manager/items', postdata)
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
    axios.delete(`http://localhost:5000/manager/inventory/`,{
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
    axios.delete(`http://localhost:5000/manager/items/`,{
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
  return (
    <>
    <Tabs defaultActiveKey="inventory">
      <Tab eventKey="inventory" title="Inventory">
        <div id = "invSection">
        <Inventory />
        <center><form onSubmit={updateInventory}>
          Update item:
        <input name = "item" label = "item name" />
        <input name = "quantity" label = "quantity"/>
        <Button type="submit">Submit</Button>
        </form>
        <br></br>
        <form onSubmit={deleteIng}>
          Delete item:
          <input name = "item" label = "item name" />
          <Button type="submit">Submit</Button>
        </form>
        </center>
        </div>
      </Tab>
      <Tab eventKey="menu" title="Menu">
        <Items />
        <center><form onSubmit={updateItems}>
          Update item:
        <input name = "item" label = "item name" />
        <input name = "price" label = "price"/>
        <input name = "ingredients" label = "ingredients"/>
        <input name = "category" label = "category"/>
        <input name = "picture" label = "picture"/>
        <Button type="submit">Submit</Button>
        </form>
        <br></br>
        <form onSubmit={deleteItem}>
          Delete item:
          <input name = "item" label = "item name" />
          <Button type="submit">Submit</Button>
        </form>
        </center>
      </Tab>
    </Tabs>
    </>
  )
}

export default Manager