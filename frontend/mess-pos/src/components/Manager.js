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
    function deleteItem(e){
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
        <form onSubmit={deleteItem}>
          Delete item:
          <input name = "item" label = "item name" />
          <Button type="submit">Submit</Button>
        </form>
        </center>
        </div>
      </Tab>
      <Tab eventKey="menu" title="Menu">Menu</Tab>
    </Tabs>
    </>
  )
}

export default Manager